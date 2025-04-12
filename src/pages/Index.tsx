
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, 
  ShoppingBag, 
  Users, 
  Wallet, 
  TrendingUp, 
  BarChart,
  ArrowUp,
  Sparkles,
  StarIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Dashboard metrics (mock data)
  const metrics = [
    { title: "Total Products", value: "128", icon: ShoppingBag, change: "+8%", changeType: "positive" },
    { title: "Total Orders", value: "1,284", icon: ShoppingCart, change: "+12%", changeType: "positive" },
    { title: "Total Customers", value: "854", icon: Users, change: "+3%", changeType: "positive" },
    { title: "Total Revenue", value: "$42,580", icon: Wallet, change: "+5.2%", changeType: "positive" },
  ];

  return (
    <Layout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purpleMedium to-purpleLight dark:from-purpleLight dark:to-purpleMedium bg-clip-text text-transparent">
            Dashboard
          </h1>
          <Link to="/products/new">
            <Button className="bg-purpleMedium hover:bg-purpleMedium/90 text-white gap-2">
              <Sparkles className="h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="overflow-hidden border-purpleMedium/10 dark:border-purpleMedium/20 dark:bg-purpleDeep/50 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-transparent to-purpleLight/5 dark:from-transparent dark:to-purpleMedium/10">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-purpleMedium/10 flex items-center justify-center text-purpleMedium dark:bg-purpleMedium/30">
                  <metric.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1 border-purpleMedium/10 dark:border-purpleMedium/20 dark:bg-purpleDeep/50 shadow-md">
            <CardHeader className="border-b border-border dark:border-purpleMedium/20 bg-gradient-to-r from-transparent to-purpleLight/5 dark:from-transparent dark:to-purpleMedium/10">
              <CardTitle className="text-lg">Recent Products</CardTitle>
              <CardDescription>Latest 5 products added to your store</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border dark:divide-purpleMedium/20">
                <div className="flex items-center justify-between p-4 hover:bg-accent/30 dark:hover:bg-purpleMedium/10">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-purpleMedium/10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-purpleMedium" />
                    </div>
                    <div className="font-medium">Ergonomic Chair</div>
                  </div>
                  <div className="text-muted-foreground">$229.99</div>
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-accent/30 dark:hover:bg-purpleMedium/10">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-purpleMedium/10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-purpleMedium" />
                    </div>
                    <div className="font-medium">Wireless Headphones</div>
                  </div>
                  <div className="text-muted-foreground">$79.99</div>
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-accent/30 dark:hover:bg-purpleMedium/10">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-purpleMedium/10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-purpleMedium" />
                    </div>
                    <div className="font-medium">Smart Watch</div>
                  </div>
                  <div className="text-muted-foreground">$199.99</div>
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-accent/30 dark:hover:bg-purpleMedium/10">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-purpleMedium/10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-purpleMedium" />
                    </div>
                    <div className="font-medium">Bluetooth Speaker</div>
                  </div>
                  <div className="text-muted-foreground">$89.99</div>
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-accent/30 dark:hover:bg-purpleMedium/10">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-purpleMedium/10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-purpleMedium" />
                    </div>
                    <div className="font-medium">Mechanical Keyboard</div>
                  </div>
                  <div className="text-muted-foreground">$149.99</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border dark:border-purpleMedium/20 py-3">
              <Link to="/products" className="text-sm text-purpleMedium hover:text-purpleMedium/80 dark:text-purpleLight dark:hover:text-purpleLight/80 hover:underline">
                View all products
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="col-span-1 border-purpleMedium/10 dark:border-purpleMedium/20 dark:bg-purpleDeep/50 shadow-md">
            <CardHeader className="border-b border-border dark:border-purpleMedium/20 bg-gradient-to-r from-transparent to-purpleLight/5 dark:from-transparent dark:to-purpleMedium/10">
              <CardTitle className="text-lg">Sales Overview</CardTitle>
              <CardDescription>Monthly sales performance</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[344px]">
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-purpleMedium/10 flex items-center justify-center mb-4">
                  <BarChart className="h-12 w-12 text-purpleMedium" />
                </div>
                <p className="text-muted-foreground">Analytics visualization will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
