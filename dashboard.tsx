"use client"

import { useState } from "react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  Bell,
  Calendar,
  CreditCard,
  Download,
  Inbox,
  Layers,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Package,
  PieChart,
  Search,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Sample data for charts
const revenueData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 2100 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 2700 },
  { name: "Jun", total: 3100 },
  { name: "Jul", total: 2900 },
  { name: "Aug", total: 3500 },
  { name: "Sep", total: 3200 },
  { name: "Oct", total: 3000 },
  { name: "Nov", total: 3800 },
  { name: "Dec", total: 4100 },
]

const usageData = [
  { name: "Jan", total: 400 },
  { name: "Feb", total: 600 },
  { name: "Mar", total: 550 },
  { name: "Apr", total: 700 },
  { name: "May", total: 800 },
  { name: "Jun", total: 850 },
  { name: "Jul", total: 900 },
  { name: "Aug", total: 950 },
  { name: "Sep", total: 1000 },
  { name: "Oct", total: 1100 },
  { name: "Nov", total: 1050 },
  { name: "Dec", total: 1200 },
]

// Sample recent orders data
const recentOrders = [
  { id: "ORD-1234", customer: "Sarah Johnson", status: "shipped", amount: "$129.99", date: "Today" },
  { id: "ORD-2345", customer: "Michael Brown", status: "processing", amount: "$79.95", date: "Yesterday" },
  { id: "ORD-3456", customer: "Emma Wilson", status: "delivered", amount: "$249.50", date: "Yesterday" },
  { id: "ORD-4567", customer: "James Taylor", status: "pending", amount: "$324.75", date: "Mar 12, 2023" },
  { id: "ORD-5678", customer: "Olivia Davis", status: "shipped", amount: "$89.99", date: "Mar 10, 2023" },
]

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <nav className="grid gap-2 p-4">{renderSidebarItems()}</nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <PieChart className="h-6 w-6" />
          <span className="text-lg font-semibold">Acme Analytics</span>
        </div>
        <div className="relative ml-auto flex-1 md:grow-0 md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full pl-8 md:w-80" />
        </div>
        <div className="hidden md:flex gap-4 ml-auto">
          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button size="icon" variant="ghost">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <aside className="hidden border-r bg-muted/40 md:block md:w-64 lg:w-72">
          <div className="h-full px-4 py-6">
            <nav className="grid gap-2">{renderSidebarItems()}</nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <div className="text-muted-foreground">
                Welcome back! Here's an overview of your business performance.
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2,350</div>
                  <p className="text-xs text-muted-foreground mt-1">+18.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground mt-1">+12.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Layers className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground mt-1">+4.3% from last hour</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts section */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue</CardTitle>
                  <CardDescription>Revenue trends over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={revenueData}
                        margin={{
                          top: 5,
                          right: 10,
                          left: 10,
                          bottom: 0,
                        }}
                      >
                        <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
                        <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(value) => `$${value}`} />
                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Usage</CardTitle>
                  <CardDescription>Resource usage statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={usageData}
                        margin={{
                          top: 5,
                          right: 10,
                          left: 10,
                          bottom: 0,
                        }}
                      >
                        <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
                        <YAxis tickLine={false} axisLine={false} fontSize={12} />
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tables section */}
            <div className="grid gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Showing the latest 5 orders</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-muted-foreground">
                          <th className="text-left font-medium p-3">Order ID</th>
                          <th className="text-left font-medium p-3">Customer</th>
                          <th className="text-left font-medium p-3">Status</th>
                          <th className="text-left font-medium p-3">Amount</th>
                          <th className="text-left font-medium p-3">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b">
                            <td className="p-3">{order.id}</td>
                            <td className="p-3">{order.customer}</td>
                            <td className="p-3">
                              <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                            </td>
                            <td className="p-3">{order.amount}</td>
                            <td className="p-3">{order.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <div className="text-xs text-muted-foreground">Showing 5 of 100 entries</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Helper functions
function getStatusVariant(status) {
  switch (status) {
    case "delivered":
      return "success"
    case "shipped":
      return "default"
    case "processing":
      return "secondary"
    case "pending":
      return "outline"
    default:
      return "default"
  }
}

function DollarSign(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  )
}

function renderSidebarItems() {
  const items = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      isActive: true,
    },
    {
      name: "Analytics",
      icon: <PieChart className="h-5 w-5" />,
    },
    {
      name: "Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Invoices",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Messages",
      icon: <Inbox className="h-5 w-5" />,
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return items.map((item) => (
    <Button key={item.name} variant={item.isActive ? "default" : "ghost"} className="justify-start gap-2 text-left">
      {item.icon}
      {item.name}
    </Button>
  ))
}

