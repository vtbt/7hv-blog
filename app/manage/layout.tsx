import '../globals.css';

export const metadata = {
  title: '7hv Blog - Manage Content',
  description: 'Manage My first project',
};

export default async function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
