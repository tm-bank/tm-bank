import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"

function HomePageDiscoveryFeed() {
    return (
        <Card className="bg-background">
            <CardHeader>
                <CardTitle>Discovery</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row gap-2">
                <div className="border border-border flex-1/2 h-20"></div>
                <div className="border border-border flex-1/2 h-20"></div>
            </CardContent>
        </Card>
    )
}


export function HomePage() {
    return <Card className="w-full h-full">
        <CardHeader>
            <CardTitle>Home</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="w-full flex flex-col gap-2 ">
                <HomePageDiscoveryFeed />
            </div>
        </CardContent>
    </Card>
}
