import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  IdCard,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { UserProfileActions } from "@/app/(dashboardGroup)/_components/users/user-profile-actions";
import { getMyProfile, getUserById } from "@/app/(dashboardGroup)/_action/UsersAction";
import { IUser } from "@/lib/types/users-type";
import { getRoleBadge, getStatusBadge } from '@/app/(dashboardGroup)/_components/users/user-helper-function';

export default async function ProfilePage() {
  const result = await getMyProfile();

  const user: IUser | null = result.data || null;

  if (!result?.success || !user) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/dashboard/admin/users">
            <ArrowLeft className="w-4 h-4" /> Back to Users
          </Link>
        </Button>
        <Card className="p-12 text-center text-muted-foreground">
          {result?.message || "User profile not found."}
        </Card>
      </div>
    );
  }

  const avatarUrl = user.profiles?.profilePhoto?.startsWith("http")
    ? user.profiles.profilePhoto
    : undefined;
  const initials = user.name ? user.name.slice(0, 2).toUpperCase() : "U";

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/dashboard/admin">
            <ArrowLeft className="w-4 h-4" /> Back to Users
          </Link>
        </Button>
      </div>

      {/* Profile Header Banner Card */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b" />
        <CardContent className="relative pt-0 pb-6 px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-16">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
              <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-background shadow-lg bg-card">
                <AvatarImage src={avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center sm:text-left pb-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
                  {getRoleBadge(user.role)}
                  {getStatusBadge(user.status)}
                </div>
                <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact & Personal Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <IdCard className="w-5 h-5 text-primary" /> Profile Details
            </CardTitle>
            <CardDescription>
              Detailed contact information and address details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="p-3 border rounded-lg bg-muted/20 space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                  <Phone className="w-3.5 h-3.5" /> Phone Number
                </span>
                <p className="text-sm font-semibold">
                  {user.profiles?.phone || (
                    <span className="text-muted-foreground font-normal italic">
                      Not provided
                    </span>
                  )}
                </p>
              </div>

              {/* Email */}
              <div className="p-3 border rounded-lg bg-muted/20 space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </span>
                <p className="text-sm font-semibold truncate">{user.email}</p>
              </div>
            </div>

            {/* Address */}
            <div className="p-3 border rounded-lg bg-muted/20 space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5" /> Physical Address
              </span>
              <p className="text-sm font-semibold">
                {user.profiles?.address || (
                  <span className="text-muted-foreground font-normal italic">
                    No address registered
                  </span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* System Metadata Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> System Identifiers
            </CardTitle>
            <CardDescription>Account database references and timestamps.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            {/* User ID */}
            <div>
              <span className="text-muted-foreground font-medium block mb-1">User ID</span>
              <code className="bg-muted px-2 py-1 rounded text-[11px] block font-mono break-all border">
                {user.id}
              </code>
            </div>

            {/* Profile ID */}
            {user.profiles?.id && (
              <div>
                <span className="text-muted-foreground font-medium block mb-1">
                  Profile ID
                </span>
                <code className="bg-muted px-2 py-1 rounded text-[11px] block font-mono break-all border">
                  {user.profiles.id}
                </code>
              </div>
            )}

            <Separator />

            {/* Created At */}
            <div className="flex items-center justify-between py-1">
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Joined Date
              </span>
              <span className="font-medium text-foreground">
                {user.created_at
                  ? format(new Date(user.created_at), "MMM dd, yyyy")
                  : "N/A"}
              </span>
            </div>

            {/* Updated At */}
            <div className="flex items-center justify-between py-1">
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Last Updated
              </span>
              <span className="font-medium text-foreground">
                {user.updated_at
                  ? format(new Date(user.updated_at), "MMM dd, yyyy")
                  : "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}