"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

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

  if (isLoading) return <div className="flex justify-center py-32"><Loader size={48} /></div>;

  return (
    <div className="bg-zinc-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">User Management</h1>
            <p className="text-zinc-500">View and manage all registered users on the platform.</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-zinc-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-zinc-50 text-zinc-500 text-xs uppercase tracking-wider font-semibold border-b border-zinc-200">
                  <th className="p-6">User</th>
                  <th className="p-6">Role</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">Joined Date</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredUsers?.map((user: any) => (
                  <tr key={user.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          user.role === 'ADMIN' ? 'bg-red-500' : user.role === 'PROVIDER' ? 'bg-blue-500' : 'bg-zinc-800'
                        }`}>
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900">{user.name}</p>
                          <p className="text-xs text-zinc-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <select 
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        disabled={updateMutation.isPending || user.role === 'ADMIN'}
                        className="p-1 border border-zinc-300 rounded text-sm bg-white outline-none disabled:opacity-50"
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
                    <td className="p-6 text-sm text-zinc-600">
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
                        <span className="text-xs text-zinc-400 italic flex items-center justify-end gap-1">
                          <Shield size={12} /> Admin privileges
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers?.length === 0 && (
            <div className="p-16 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">No users found</h3>
              <p className="text-zinc-500">No users match your search criteria.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
