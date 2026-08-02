import React from 'react'
import { getAllUsers } from '@/app/(dashboardGroup)/_action/UsersAction';
import { UserRowActions } from '@/app/(dashboardGroup)/_components/users/user-row-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IUser, Role } from '@/lib/types/users-type';
import { format } from 'date-fns';
import { Building, Mail, MapPin, Phone, ShieldCheck, UserCheck, Users, UserX, Calendar } from 'lucide-react';
import Link from 'next/link';
import { getRoleBadge, getStatusBadge } from '@/app/(dashboardGroup)/_components/users/user-helper-function';
import { getMe } from '@/service/getMe';

const GetAllUsersPage = async () => {
   const result = await getAllUsers();
  const users: IUser[] = Array.isArray(result?.data) ? result.data : [];

  const userMe = await getMe();

  if (!result?.success || users.length === 0) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage system users, providers, and administrator access.
          </p>
        </div>
        <Card className="p-12 text-center text-muted-foreground">
          {result?.message || "No users found in the system."}
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-sm text-muted-foreground">
          Inspect user accounts, manage roles, block or activate accounts.
        </p>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> System Accounts
            <Badge variant="secondary" className="ml-2 font-normal">
              {Users.length} Registered
            </Badge>
          </CardTitle>
          <CardDescription>
            Overview of registered providers, admins, and standard users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[280px]">User Info</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact & Address</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="w-[80px] text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const avatarUrl = user.profiles?.profilePhoto?.startsWith("http")
                    ? user.profiles.profilePhoto
                    : undefined;
                  const initials = user.name ? user.name.slice(0, 2).toUpperCase() : "U";

                  return (
                    <TableRow key={user.id} className="hover:bg-muted/40 transition-colors">
                      {/* User Info */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage src={avatarUrl} alt={user.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col min-w-0">
                            <Link
                              href={`/dashboard/admin/profile/${user.id}`}
                              className="font-semibold text-sm hover:underline truncate"
                            >
                              {user.name}
                            </Link>
                            <span className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                              <Mail className="w-3 h-3 shrink-0" />
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Role Badge */}
                      <TableCell>{getRoleBadge(user.role)}</TableCell>

                      {/* Status Badge */}
                      <TableCell>{getStatusBadge(user.status)}</TableCell>

                      {/* Contact & Location */}
                      <TableCell>
                        <div className="flex flex-col text-xs space-y-1">
                          {user.profiles?.phone ? (
                            <span className="flex items-center gap-1 text-foreground">
                              <Phone className="w-3 h-3 text-muted-foreground shrink-0" />
                              {user.profiles.phone}
                            </span>
                          ) : (
                            <span className="text-muted-foreground italic">No phone</span>
                          )}

                          {user.profiles?.address ? (
                            <span className="flex items-center gap-1 text-muted-foreground truncate max-w-[180px]">
                              <MapPin className="w-3 h-3 shrink-0" />
                              {user.profiles.address}
                            </span>
                          ) : (
                            <span className="text-muted-foreground italic">No address</span>
                          )}
                        </div>
                      </TableCell>

                      {/* Created At */}
                      <TableCell>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          {user.created_at
                            ? format(new Date(user.created_at), "MMM dd, yyyy")
                            : "N/A"}
                        </div>
                      </TableCell>

                      {/* Interactive Dropdown Actions */}
                      <TableCell className="text-center">
                        <UserRowActions
                          userId={user.id}
                          userMe={userMe.data.id}
                          userName={user.name}
                          currentRole={user.role}
                          currentStatus={user.status}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default GetAllUsersPage;