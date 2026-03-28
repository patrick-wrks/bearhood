"use client";

import { useState } from "react";
import { ChevronDown, Info, Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";

const sectionClass = "rounded-xl border bg-card p-5";

export default function UiFoundationPage() {
  const locale = useLocale();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [progress, setProgress] = useState(42);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-6">
      <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {t(locale, "uiFoundation.title")}
          </h1>
        <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "uiFoundation.description")}
        </p>
      </div>

      <div className={sectionClass}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink href={`/${locale}`}>{t(locale, "breadcrumb.home")}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{t(locale, "breadcrumb.uiFoundation")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Buttons and Badges</CardTitle>
            <CardDescription>Primary actions and status tokens.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Live</Badge>
              <Badge variant="secondary">Draft</Badge>
              <Badge variant="outline">Archived</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Form controls and selection components.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Event Name</Label>
              <Input id="name" placeholder="Bearhood Night Market" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Verification Code</Label>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className={sectionClass}>
          <h2 className="mb-4 font-medium">Menus and Overlays</h2>
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                Dropdown
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Event Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                Popover
              </PopoverTrigger>
              <PopoverContent>
                Quick filters for event visibility and publishing state.
              </PopoverContent>
            </Popover>

            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>
                    Use this modal pattern for creation and editing flows.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="destructive" />}>
                Alert Dialog
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete event?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="mb-4 font-medium">Sheet and Drawer</h2>
          <div className="flex flex-wrap gap-2">
            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>Open Sheet</SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Team Activity</SheetTitle>
                  <SheetDescription>Use sheets for side-panel workflows.</SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Mobile Quick Actions</DrawerTitle>
                  <DrawerDescription>Great for mobile-first confirmations.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Confirm</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className={sectionClass}>
          <h2 className="mb-4 font-medium">Navigation</h2>
          <div className="space-y-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className="px-3 py-2" href="#">
                    Overview
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="px-3 py-2" href="#">
                    Analytics
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>New Event</MenubarItem>
                  <MenubarItem>Import CSV</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Grid</MenubarItem>
                  <MenubarItem>List</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="mb-4 font-medium">Feedback and Motion</h2>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>
                UI tokens are now centralized. Build new pages from this foundation.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Upload Progress</span>
                <Button variant="ghost" size="sm" onClick={() => setProgress((p) => (p >= 100 ? 15 : p + 15))}>
                  Increase
                </Button>
              </div>
              <Progress value={progress} />
            </div>

            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[220px]" />
                <Skeleton className="h-4 w-[160px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className={sectionClass}>
          <h2 className="mb-4 font-medium">Selection Controls</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept guidelines</Label>
            </div>

            <RadioGroup defaultValue="public">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public">Public Event</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private">Private Event</Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label>Volume</Label>
              <Slider defaultValue={[45]} max={100} step={1} />
            </div>

            <div className="flex items-center gap-2">
              <Switch id="notifications" />
              <Label htmlFor="notifications">Enable notifications</Label>
            </div>

            <Toggle aria-label="Toggle featured">Featured</Toggle>

            <ToggleGroup>
              <ToggleGroupItem value="day">Day</ToggleGroupItem>
              <ToggleGroupItem value="week">Week</ToggleGroupItem>
              <ToggleGroupItem value="month">Month</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="mb-4 font-medium">Date and Content Controls</h2>
          <div className="space-y-4">
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
            <Textarea placeholder="Event notes..." />
            <Collapsible>
              <CollapsibleTrigger className="inline-flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm">
                Advanced Options
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 text-sm text-muted-foreground">
                Add payout rules, moderation settings, and custom RSVP fields here.
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h2 className="mb-4 font-medium">Data Display</h2>
        <Tabs defaultValue="table">
          <TabsList>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="list">Scrollable List</TabsTrigger>
          </TabsList>
          <TabsContent value="table" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Capacity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Night Market</TableCell>
                  <TableCell>
                    <Badge>Live</Badge>
                  </TableCell>
                  <TableCell>500</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Forest Pulse</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Draft</Badge>
                  </TableCell>
                  <TableCell>1200</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="list" className="mt-4">
            <ScrollArea className="h-40 rounded-md border p-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <p key={index} className="text-sm leading-7">
                  Lineup update #{index + 1}: Artist confirmations and run-of-show notes.
                </p>
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className={sectionClass}>
          <h2 className="mb-4 font-medium">Command and Context</h2>
          <Command className="rounded-lg border">
            <CommandInput placeholder="Search commands..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Search className="h-4 w-4" />
                  Open Event Search
                  <CommandShortcut>⌘K</CommandShortcut>
                </CommandItem>
                <CommandItem>Create New Campaign</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>Brand Theme</CommandItem>
                <CommandItem>Integrations</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>

          <ContextMenu>
            <ContextMenuTrigger className="mt-4 rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
              Right-click this area
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>Quick actions</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuItem>Duplicate Event</ContextMenuItem>
              <ContextMenuItem>Move to Drafts</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>

        <div className={sectionClass}>
          <h2 className="mb-4 font-medium">Profile and Hints</h2>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>BH</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Bearhood Team</p>
              <p className="text-xs text-muted-foreground">Design system owners</p>
            </div>
          </div>

          <Separator className="my-4" />

          <HoverCard>
            <HoverCardTrigger className="text-sm text-primary underline-offset-4 hover:underline">
              Hover for quick profile
            </HoverCardTrigger>
            <HoverCardContent>
              Keep this pattern for glanceable account and event details.
            </HoverCardContent>
          </HoverCard>

          <div className="mt-4">
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>Tooltip Target</TooltipTrigger>
              <TooltipContent>Use tooltips for concise contextual help.</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h2 className="mb-4 font-medium">Accordion FAQs</h2>
        <Accordion>
          <AccordionItem value="q1">
            <AccordionTrigger>How should we use this page?</AccordionTrigger>
            <AccordionContent>
              Treat this as the component reference surface for future screens and feature flows.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>Can we add custom variants?</AccordionTrigger>
            <AccordionContent>
              Yes. Keep variants in `components/ui` wrappers so product pages stay clean.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
