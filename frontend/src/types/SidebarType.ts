export interface SidebarItem {
  name: string;
  path: string;
}
export interface SidebarProps {
  items: Array<SidebarItem>;
  onSidebarClick: (item: string) => void;
}
