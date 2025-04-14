// src/pages/admin/edit-packages.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";

interface PackageItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  highlights: string[];
  duration: string;
  route: string;
  dates: string[];
  rating: number;
  full_description: string;
  itinerary: Array<{ title: string; description: string; details: string }>;
  price: number;
  inclusions: string[];
  exclusions: string[];
  bestSeason: string[];
  [key: string]: any; // Allow dynamic properties
}

interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'array' | 'itinerary';
  required?: boolean;
}

const EditPackagesPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<string>("majorCitiesPackage");
  const [data, setData] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<PackageItem | null>(null);
  const [formData, setFormData] = useState<Partial<PackageItem>>({});
  const [newArrayItem, setNewArrayItem] = useState<Record<string, string>>({});
  const [newItineraryItem, setNewItineraryItem] = useState({
    title: "",
    description: "",
    details: "",
  });

  const availableFiles = [
    "majorCitiesPackage",
    "popularDestination",
    "festivialTours",
    "culturalTours",
    "trekkingAdventure",
    "groupTours",
  ];

  // Define field configurations for each package type
  const packageFieldConfigs: Record<string, FieldConfig[]> = {
    majorCitiesPackage: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image URL', type: 'text' },
      { name: 'alt', label: 'Alt Text', type: 'text' },
      { name: 'duration', label: 'Duration', type: 'text' },
      { name: 'route', label: 'Route', type: 'text' },
      { name: 'rating', label: 'Rating', type: 'number' },
      { name: 'price', label: 'Price', type: 'number' },
      { name: 'full_description', label: 'Full Description', type: 'textarea' },
      { name: 'highlights', label: 'Highlights', type: 'array' },
      { name: 'inclusions', label: 'Inclusions', type: 'array' },
      { name: 'exclusions', label: 'Exclusions', type: 'array' },
      { name: 'dates', label: 'Dates', type: 'array' },
      { name: 'bestSeason', label: 'Best Season', type: 'array' },
      { name: 'itinerary', label: 'Itinerary', type: 'itinerary' },
    ],
    popularDestination: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'image', label: 'Image URL', type: 'text' },
      ],
    // Add configurations for other package types later
  };

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/login");
    } else {
      fetchData();
    }
  }, [selectedFile, isLoading, isAuthenticated, user]);

  const fetchData = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/packages/${selectedFile}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setData(Array.isArray(result) ? result : []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFile(e.target.value);
    setIsEditing(null);
    setFormData({});
    setNewArrayItem({});
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleArrayInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: [...((prev[fieldName] as string[]) || []), value],
    }));
  };

  const handleRemoveArrayItem = (fieldName: string, index: number) => {
    setFormData((prev) => {
      const arr = [...((prev[fieldName] as string[]) || [])];
      arr.splice(index, 1);
      return { ...prev, [fieldName]: arr };
    });
  };

  const handleMoveItineraryItem = (index: number, direction: 'up' | 'down') => {
    setFormData(prev => {
      if (!prev.itinerary) return prev;
      
      const newItinerary = [...prev.itinerary];
      if (direction === 'up' && index > 0) {
        [newItinerary[index], newItinerary[index - 1]] = [newItinerary[index - 1], newItinerary[index]];
      } else if (direction === 'down' && index < newItinerary.length - 1) {
        [newItinerary[index], newItinerary[index + 1]] = [newItinerary[index + 1], newItinerary[index]];
      }
      
      return { ...prev, itinerary: newItinerary };
    });
  };

  const handleItineraryChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => {
      const itinerary = [...(prev.itinerary || [])];
      itinerary[index] = { ...itinerary[index], [field]: value };
      return { ...prev, itinerary };
    });
  };

  const handleAddItineraryItem = () => {
    if (
      !newItineraryItem.title ||
      !newItineraryItem.description ||
      !newItineraryItem.details
    )
      return;
    setFormData((prev) => ({
      ...prev,
      itinerary: [...(prev.itinerary || []), newItineraryItem],
    }));
    setNewItineraryItem({ title: "", description: "", details: "" });
  };

  const handleRemoveItineraryItem = (index: number) => {
    setFormData((prev) => {
      const itinerary = [...(prev.itinerary || [])];
      itinerary.splice(index, 1);
      return { ...prev, itinerary };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = `/api/packages/${selectedFile}${
        isEditing ? `?id=${isEditing.id}` : ""
      }`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save data");

      await fetchData();
      setIsEditing(null);
      setFormData({});
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/packages/${selectedFile}?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item");
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: PackageItem) => {
    setIsEditing(item);
    setFormData({ ...item });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setFormData({});
  };

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case 'text':
        return (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}:</label>
            <input
              type="text"
              name={field.name}
              value={(formData[field.name] as string) || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required={field.required}
            />
          </div>
        );
      case 'number':
        return (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}:</label>
            <input
              type="number"
              name={field.name}
              value={(formData[field.name] as number) || ''}
              onChange={handleNumberInputChange}
              className="w-full p-2 border rounded"
              required={field.required}
            />
          </div>
        );
      case 'textarea':
        return (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}:</label>
            <textarea
              name={field.name}
              value={(formData[field.name] as string) || ''}
              onChange={handleInputChange}
              rows={field.name === 'full_description' ? 5 : 3}
              className="w-full p-2 border rounded"
              required={field.required}
            />
          </div>
        );
      case 'array':
        return (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}:</label>
            <div className="flex mb-2">
              <input
                type="text"
                value={newArrayItem[field.name] || ''}
                onChange={(e) => setNewArrayItem({
                  ...newArrayItem,
                  [field.name]: e.target.value
                })}
                className="flex-1 p-2 border rounded-l"
                placeholder={`New ${field.label}`}
              />
              <button
                type="button"
                onClick={() => {
                  if (newArrayItem[field.name]) {
                    handleArrayInputChange(field.name, newArrayItem[field.name]);
                    setNewArrayItem({ ...newArrayItem, [field.name]: '' });
                  }
                }}
                className="bg-blue-500 text-white px-4 rounded-r"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData[field.name] as string[] || []).map((item, index) => (
                <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem(field.name, index)}
                    className="ml-2 text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'itinerary':
        return (
          <div key={field.name} className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Itinerary Details</h3>
            <div className="space-y-6 mb-8">
              {formData.itinerary?.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-lg">
                      Day {index + 1}: {item.title}
                    </h4>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveItineraryItem(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove Day
                      </button>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleMoveItineraryItem(index, "up")}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Move Up
                        </button>
                      )}
                      {index < (formData.itinerary?.length || 0) - 1 && (
                        <button
                          type="button"
                          onClick={() => handleMoveItineraryItem(index, "down")}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Move Down
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium">
                        Title
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          handleItineraryChange(index, "title", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        placeholder="Day title"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">
                        Description
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          handleItineraryChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded"
                        placeholder="Brief description"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block mb-1 text-sm font-medium">
                        Details
                      </label>
                      <textarea
                        value={item.details}
                        onChange={(e) =>
                          handleItineraryChange(
                            index,
                            "details",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded"
                        rows={4}
                        placeholder="Detailed description of the day's activities"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 bg-blue-50">
              <h4 className="text-lg font-medium text-blue-800 mb-4">
                Add New Itinerary Day
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Title*
                  </label>
                  <input
                    type="text"
                    value={newItineraryItem.title}
                    onChange={(e) =>
                      setNewItineraryItem({
                        ...newItineraryItem,
                        title: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    placeholder="Day title"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Description*
                  </label>
                  <input
                    type="text"
                    value={newItineraryItem.description}
                    onChange={(e) =>
                      setNewItineraryItem({
                        ...newItineraryItem,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    placeholder="Brief description"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">
                  Details*
                </label>
                <textarea
                  value={newItineraryItem.details}
                  onChange={(e) =>
                    setNewItineraryItem({
                      ...newItineraryItem,
                      details: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  rows={4}
                  placeholder="Detailed description of the day's activities"
                />
              </div>

              <button
                type="button"
                onClick={handleAddItineraryItem}
                disabled={
                  !newItineraryItem.title ||
                  !newItineraryItem.description ||
                  !newItineraryItem.details
                }
                className={`px-4 py-2 rounded-md ${
                  !newItineraryItem.title ||
                  !newItineraryItem.description ||
                  !newItineraryItem.details
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Add Day to Itinerary
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading || !isAuthenticated || user?.role !== "admin") {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading or not authorized...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Edit Packages - Admin</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6">Edit Package Data</h1>

      <div className="mb-6">
        <label htmlFor="file-select" className="block mb-2 font-medium">
          Select Package File:
        </label>
        <select
          id="file-select"
          value={selectedFile}
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        >
          {availableFiles.map((file) => (
            <option key={file} value={file}>
              {file}.json
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Package" : "Add New Package"}
        </h2>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packageFieldConfigs[selectedFile]?.filter(f => 
              ['text', 'number'].includes(f.type)
            ).map(field => renderField(field))}
          </div>

          {packageFieldConfigs[selectedFile]?.filter(f => 
            f.type === 'textarea'
          ).map(field => renderField(field))}

          {packageFieldConfigs[selectedFile]?.filter(f => 
            f.type === 'array' && f.name !== 'itinerary'
          ).map(field => renderField(field))}

          {packageFieldConfigs[selectedFile]?.some(f => f.type === 'itinerary') && 
            renderField({ name: 'itinerary', label: 'Itinerary', type: 'itinerary' })
          }

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading
                ? "Saving..."
                : isEditing
                ? "Update Package"
                : "Add Package"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Current Packages in {selectedFile}.json
        </h2>

        {loading && !data.length ? (
          <div className="text-center py-8">Loading data...</div>
        ) : data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500">
                        {item.description.substring(0, 50)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No packages found in this file
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPackagesPage;