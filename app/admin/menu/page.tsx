'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Flame } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function AdminMenuPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [vegetarian, setVegetarian] = useState(true);
  const [vegan, setVegan] = useState(false);
  const [spicyLevel, setSpicyLevel] = useState(1);
  const [popular, setPopular] = useState(false);
  const [featured, setFeatured] = useState(false);

  const { setToastMessage } = useCart();

  const fetchMenu = () => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => {
        if (data.items) setItems(data.items);
      });
  };

  useEffect(() => {
    fetchMenu();
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) {
          setCategories(data.categories);
          if (data.categories.length > 0) setCategoryId(data.categories[0].id);
        }
      });
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setName('');
    setDescription('');
    setPrice('');
    setImage('https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop');
    setVegetarian(true);
    setVegan(false);
    setSpicyLevel(1);
    setPopular(false);
    setFeatured(false);
    setModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setEditingItem(item);
    setName(item.name);
    setCategoryId(item.categoryId);
    setDescription(item.description);
    setPrice(item.price.toString());
    setImage(item.image);
    setVegetarian(item.vegetarian);
    setVegan(item.vegan);
    setSpicyLevel(item.spicyLevel);
    setPopular(item.popular);
    setFeatured(item.featured);
    setModalOpen(true);
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setToastMessage('Item deleted');
        fetchMenu();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      categoryId,
      description,
      price: parseFloat(price),
      image,
      vegetarian,
      vegan,
      spicyLevel,
      popular,
      featured,
    };

    try {
      const url = editingItem ? `/api/menu/${editingItem.id}` : '/api/menu';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setToastMessage(editingItem ? 'Item updated successfully' : 'Item added successfully');
        setModalOpen(false);
        fetchMenu();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold">Menu Management</h2>
        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 rounded-full bg-saffron-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Dish
        </button>
      </div>

      <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-charcoal-800 text-charcoal-400 font-mono uppercase">
              <th className="py-3 px-2">Image</th>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Category</th>
              <th className="py-3 px-2">Price</th>
              <th className="py-3 px-2">Dietary</th>
              <th className="py-3 px-2">Flags</th>
              <th className="py-3 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-800/60">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-charcoal-950/60">
                <td className="py-3 px-2">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                </td>
                <td className="py-3 px-2 font-bold text-cream-100">{item.name}</td>
                <td className="py-3 px-2">{item.category?.name}</td>
                <td className="py-3 px-2 font-bold text-saffron-400">₹{item.price}</td>
                <td className="py-3 px-2">
                  {item.vegetarian ? '🌱 Veg' : '🍗 Non-Veg'}
                </td>
                <td className="py-3 px-2 space-x-1">
                  {item.popular && <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">Popular</span>}
                  {item.featured && <span className="px-2 py-0.5 rounded-full bg-saffron-500/20 text-saffron-400 text-[10px] font-bold">Featured</span>}
                </td>
                <td className="py-3 px-2 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-1.5 rounded-lg bg-charcoal-800 hover:text-saffron-400 text-charcoal-300"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 rounded-lg bg-charcoal-800 hover:text-red-400 text-charcoal-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-charcoal-900 border border-charcoal-800 rounded-3xl p-6 shadow-2xl relative text-xs space-y-4">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-charcoal-400 hover:text-cream-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold">
              {editingItem ? 'Edit Dish' : 'Add New Dish'}
            </h3>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-charcoal-400 mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal-400 mb-1">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2.5 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-charcoal-400 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2.5 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-charcoal-400 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-2.5 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100"
                />
              </div>

              <div>
                <label className="block text-charcoal-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-charcoal-950 border border-charcoal-700 rounded-xl text-cream-100"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vegetarian}
                    onChange={(e) => setVegetarian(e.target.checked)}
                  />
                  <span>🌱 Vegetarian</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vegan}
                    onChange={(e) => setVegan(e.target.checked)}
                  />
                  <span>🌿 Vegan</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={popular}
                    onChange={(e) => setPopular(e.target.checked)}
                  />
                  <span>❤️ Popular</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                  <span>⭐ Featured</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-saffron-500 text-charcoal-950 font-bold uppercase tracking-wider text-xs"
              >
                Save Dish
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
