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
            <h2 className="text-2xl font-bold text-black mb-4 absolute top-5 left-7">
                {title}
            </h2>

            {children}
        </div>
    );
}