import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Zap, ArrowLeft, Save, Upload, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useFreelance } from "@/hooks/useFreelance";

const CreateService = () => {
    const navigate = useNavigate();
    const { createService, categories } = useFreelance();
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        category_id: "",
        delivery_time: "",
        price: "",
        price_type: "fixed" as "fixed" | "hourly",
        description: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createService.mutateAsync({
                ...formData,
                price: parseFloat(formData.price),
                portfolio_urls: [], // Add logic for file uploads later
                tags: [],
                is_active: true
            });

            toast.success("Gig published successfully! It's now live on the marketplace.");
            navigate("/freelancing");
        } catch (error: any) {
            console.error("Error creating service:", error);
            toast.error(error.message || "Failed to publish gig. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-12 px-6">
                <Link to="/freelancing" className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:underline mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    BACK TO MARKETPLACE
                </Link>

                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase mb-4">
                        POST A <span className="text-primary/40">NEW GIG</span>
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        Create a compelling service listing to attract top startups and companies.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Basic Info */}
                    <section className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <Info className="h-4 w-4" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Basic Information</h2>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Gig Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g., I will design a modern SaaS landing page"
                                className="h-12 bg-black/40 border-white/10 rounded-xl focus:border-primary/50"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Category</Label>
                                <Select
                                    value={formData.category_id}
                                    onValueChange={(val) => setFormData({ ...formData, category_id: val })}
                                    required
                                >
                                    <SelectTrigger className="h-12 bg-black/40 border-white/10 rounded-xl">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-white/10">
                                        {categories.data?.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                        ))}
                                        {!categories.data && (
                                            <>
                                                <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                                                <SelectItem value="frontend">Frontend Development</SelectItem>
                                                <SelectItem value="backend">Backend Development</SelectItem>
                                            </>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="delivery" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Expected Delivery</Label>
                                <Input
                                    id="delivery"
                                    value={formData.delivery_time}
                                    onChange={(e) => setFormData({ ...formData, delivery_time: e.target.value })}
                                    placeholder="e.g., 3 Days"
                                    className="h-12 bg-black/40 border-white/10 rounded-xl focus:border-primary/50"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {/* Pricing & Details */}
                    <section className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <Zap className="h-4 w-4" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Pricing & Details</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="price_type" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Pricing Model</Label>
                                <Select
                                    value={formData.price_type}
                                    onValueChange={(val: any) => setFormData({ ...formData, price_type: val })}
                                >
                                    <SelectTrigger className="h-12 bg-black/40 border-white/10 rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-white/10">
                                        <SelectItem value="fixed">Fixed Price</SelectItem>
                                        <SelectItem value="hourly">Hourly Rate</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Price (₹)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="5000"
                                    className="h-12 bg-black/40 border-white/10 rounded-xl focus:border-primary/50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Gig Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Describe what you offer in detail..."
                                className="min-h-[150px] bg-black/40 border-white/10 rounded-xl focus:border-primary/50 resize-none"
                                required
                            />
                        </div>
                    </section>

                    {/* Portfolio & Submission */}
                    <section className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <Upload className="h-4 w-4" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Portfolio & Media</h2>
                        </div>

                        <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center hover:border-primary/30 transition-colors cursor-pointer group">
                            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                            </div>
                            <p className="text-sm font-bold text-white mb-1">Click to upload cover image</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">JPG, PNG or WEBP (Max 5MB)</p>
                        </div>

                        <div className="pt-4 flex flex-col md:flex-row gap-4">
                            <Button
                                type="submit"
                                disabled={loading || createService.isPending}
                                className="flex-1 h-14 rounded-2xl bg-primary text-black font-black uppercase tracking-[0.2em] hover:bg-primary/90 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                            >
                                {loading ? "PUBLISHING..." : "PUBLISH GIG"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-14 px-8 rounded-2xl border-white/10 bg-white/5 font-bold uppercase tracking-widest"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                SAVE DRAFT
                            </Button>
                        </div>
                    </section>
                </form>
            </div>
        </Layout>
    );
};

export default CreateService;
