"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, updateUserStatus } from '@/services/admin.service';
import { Loader } from '@/components/ui/Loader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Users, Search, Shield, Ban, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: getAllUsers,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => updateUserStatus(id, payload),
    onSuccess: () => {
      toast.success('User updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to update user');
    }
  });

  const handleStatusToggle = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
    updateMutation.mutate({ id: userId, payload: { status: newStatus } });
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    updateMutation.mutate({ id: userId, payload: { role: newRole } });
  };

  const filteredUsers = users?.filter((user: any) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = filteredUsers ? Math.ceil(filteredUsers.length / itemsPerPage) : 0;
  const paginatedUsers = filteredUsers?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (isLoading) return <div className="flex justify-center py-32"><Loader size={48} /></div>;

  return (
    <div className="bg-paper min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl text-ink tracking-tight mb-2">User Management</h1>
            <p className="text-ink-soft">View and manage all registered users on the platform.</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-ink-soft" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-line rounded-lg focus:ring-2 focus:ring-trail outline-none text-sm"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-paper text-ink-soft text-xs uppercase tracking-wider font-semibold border-b border-line">
                  <th className="p-6">User</th>
                  <th className="p-6">Role</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">Joined Date</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {paginatedUsers?.map((user: any) => (
                  <tr key={user.id} className="hover:bg-line/50 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          user.role === 'ADMIN' ? 'bg-red-500' : user.role === 'PROVIDER' ? 'bg-blue-500' : 'bg-ink'
                        }`}>
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-ink">{user.name}</p>
                          <p className="text-xs text-ink-soft">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <select 
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        disabled={updateMutation.isPending || user.role === 'ADMIN'}
                        className="p-1 border border-line rounded text-sm bg-card outline-none disabled:opacity-50"
                      >
                        <option value="CUSTOMER">Customer</option>
                        <option value="PROVIDER">Provider</option>
                        {user.role === 'ADMIN' && <option value="ADMIN">Admin</option>}
                      </select>
                    </td>
                    <td className="p-6">
                      {user.status === 'ACTIVE' ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge variant="danger">Blocked</Badge>
                      )}
                    </td>
                    <td className="p-6 text-sm text-ink-soft">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-6 text-right">
                      {user.role !== 'ADMIN' ? (
                        <Button
                          size="sm"
                          variant={user.status === 'ACTIVE' ? 'danger' : 'outline'}
                          onClick={() => handleStatusToggle(user.id, user.status)}
                          isLoading={updateMutation.isPending}
                          leftIcon={user.status === 'ACTIVE' ? <Ban size={14} /> : <CheckCircle size={14} />}
                        >
                          {user.status === 'ACTIVE' ? 'Block User' : 'Unblock User'}
                        </Button>
                      ) : (
                        <span className="text-xs text-ink-soft italic flex items-center justify-end gap-1">
                          <Shield size={12} /> Admin privileges
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {totalPages > 1 && (
            <div className="p-4 border-t border-line flex items-center justify-between">
              <p className="text-sm text-ink-soft">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredUsers?.length || 0)}</span> of <span className="font-medium">{filteredUsers?.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                        currentPage === i + 1 
                          ? 'bg-trail text-white' 
                          : 'text-ink-soft hover:bg-line/50 hover:text-ink'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
          
          {filteredUsers?.length === 0 && (
            <div className="p-16 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-line/60 rounded-full flex items-center justify-center text-ink-soft mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">No users found</h3>
              <p className="text-ink-soft">No users match your search criteria.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
