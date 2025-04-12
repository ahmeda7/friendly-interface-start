
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  SlidersHorizontal
} from "lucide-react";
import { ProductModal } from "@/components/ProductModal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// Sample product data (this would typically come from an API)
const initialProducts = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 79.99, stock: 25 },
  { id: 2, name: "Ergonomic Chair", category: "Furniture", price: 229.99, stock: 15 },
  { id: 3, name: "Smart Watch", category: "Electronics", price: 199.99, stock: 30 },
  { id: 4, name: "Coffee Maker", category: "Appliances", price: 89.99, stock: 12 },
  { id: 5, name: "Yoga Mat", category: "Fitness", price: 29.99, stock: 50 },
  { id: 6, name: "Gaming Keyboard", category: "Electronics", price: 149.99, stock: 18 },
  { id: 7, name: "Blender", category: "Appliances", price: 69.99, stock: 22 },
  { id: 8, name: "Desk Lamp", category: "Furniture", price: 39.99, stock: 35 },
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Products per page for pagination
  const productsPerPage = 5;
  
  // Filter products based on search
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Handle creating or updating a product
  const handleSaveProduct = (product) => {
    if (product.id) {
      // Update existing product
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      // Create new product
      const newProduct = {
        ...product,
        id: Math.max(...products.map(p => p.id), 0) + 1
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Handle editing a product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">Products</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9 w-full sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="sm:ml-2 flex items-center gap-1">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button
              onClick={() => {
                setEditingProduct(null);
                setIsModalOpen(true);
              }}
              className="sm:ml-2 flex items-center gap-1"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <div className="rounded-lg border shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Product</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{product.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * productsPerPage) + 1} to {Math.min(currentPage * productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Product Modal for Create/Edit */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
          product={editingProduct}
        />
      </div>
    </Layout>
  );
};

export default Products;
