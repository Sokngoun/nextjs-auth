"use client"

export default function DashboardLayout({children}:{children: React.ReactNode}){
    return (
        <main>
            <header>Navigation</header>
            {children}
        </main>
    )
}