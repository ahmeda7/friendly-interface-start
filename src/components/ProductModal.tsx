
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product: Product | null;
}

export function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
  const [formData, setFormData] = useState<Product>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
  });

  // Update form data when editing an existing product
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description || "",
      });
    } else {
      // Reset form when creating a new product
      setFormData({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        description: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "price" || name === "stock" ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Product name is required",
        variant: "destructive"
      });
      return;
    }

    if (formData.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Price must be greater than 0",
        variant: "destructive"
      });
      return;
    }

    // Save the product
    onSave(formData);
    
    // Show success toast
    toast({
      title: `${product ? "Updated" : "Created"} Successfully`,
      description: `Product was ${product ? "updated" : "created"} successfully.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{product ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
