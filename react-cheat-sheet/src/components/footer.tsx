export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-4 px-6">
      <div className="text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} ファイルアップローダー. All rights reserved.</p>
      </div>
    </footer>
  )
}
