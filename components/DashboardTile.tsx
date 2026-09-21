type DashboardTileProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
};

export default function DashboardTile({
    title, 
    children,
    className = "",
}: DashboardTileProps) {
    return (
        <div className={`bg-white rounded-4xl p-6 relative drop-shadow ${className}`}>
            <div className="absolute top-5 left-8 w-75 h-15">
                <h2 className="text-2xl font-bold text-black mb-4 text-left">
                    {title}
                </h2>
            </div>

            {children}
        </div>
    );
}