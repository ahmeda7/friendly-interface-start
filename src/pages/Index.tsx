
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Package, Users, DollarSign, TrendingUp, BarChart } from "lucide-react";

const Index = () => {
  // Dashboard metrics (mock data)
  const metrics = [
    { title: "Total Products", value: "128", icon: Package, change: "+8%", changeType: "positive" },
    { title: "Total Orders", value: "1,284", icon: ShoppingCart, change: "+12%", changeType: "positive" },
    { title: "Total Customers", value: "854", icon: Users, change: "+3%", changeType: "positive" },
    { title: "Total Revenue", value: "$42,580", icon: DollarSign, change: "+5.2%", changeType: "positive" },
  ];

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link 
            to="/products/new" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
          >
            Add Product
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs ${metric.changeType === "positive" ? "text-green-500" : "text-red-500"} flex items-center`}>
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Products</CardTitle>
              <CardDescription>Latest 5 products added to your store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="font-medium">Ergonomic Chair</div>
                  <div className="text-muted-foreground">$229.99</div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="font-medium">Wireless Headphones</div>
                  <div className="text-muted-foreground">$79.99</div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="font-medium">Smart Watch</div>
                  <div className="text-muted-foreground">$199.99</div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="font-medium">Bluetooth Speaker</div>
                  <div className="text-muted-foreground">$89.99</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Mechanical Keyboard</div>
                  <div className="text-muted-foreground">$149.99</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/products" className="text-sm text-blue-500 hover:underline">View all products</Link>
            </CardFooter>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Monthly sales performance</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center text-center">
                <BarChart className="h-16 w-16 text-muted-foreground mb-4" />
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
