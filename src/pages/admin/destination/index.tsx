// src/pages/admin/edit-popular-destinations.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";

interface PopularDestinationItem {
  id: string;
  name: string;
  slug: string;
  rating: number;
  tagline: string;
  description: string;
  highlights: string[];
  location: {
    region: string;
    coordinates: { lat: number; lng: number };
    nearbyDzongkhags: string[];
  };
  culture: {
    dzongs: string[];
    festivals: string[];
    localDish: string;
  };
  nature: {
    trekkingRoutes: string[];
    wildlife: string;
    scenicSpots: string[];
  };
  experiences: Array<{
    type: string;
    activities: string[];
  }>;
  practicalInfo: {
    bestTimeToVisit: string[];
    accommodation: string[];
    transportation: string[];
  };
  media: {
    images: string[];
    video: string;
  };
  placesToVisit: Array<{
    name: string;
    image: string;
    description: string;
    rating: number;
    distance: string;
  }>;
  usps: string[];
  meta: {
    lastUpdated: string;
    popularity: number;
  };
}

interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "textarea" | "array" | "object" | "nestedArray";
  required?: boolean;
  fields?: FieldConfig[];
  itemFields?: FieldConfig[];
}

const EditPopularDestinationsPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<PopularDestinationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<PopularDestinationItem | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<PopularDestinationItem>>({});
  const [newArrayItem, setNewArrayItem] = useState<Record<string, string>>({});
  const [newObjectItem, setNewObjectItem] = useState<Record<string, any>>({});
  const [newNestedArrayItem, setNewNestedArrayItem] = useState<
    Record<string, any>
  >({});


  const fieldConfigs: FieldConfig[] = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "rating", label: "Rating", type: "number" },
    { name: "tagline", label: "Tagline", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "highlights", label: "Highlights", type: "array" },
    {
      name: "location",
      label: "Location",
      type: "object",
      fields: [
        { name: "region", label: "Region", type: "text" },
        {
          name: "coordinates",
          label: "Coordinates",
          type: "object",
          fields: [
            { name: "lat", label: "Latitude", type: "number" },
            { name: "lng", label: "Longitude", type: "number" },
          ],
        },
        { name: "nearbyDzongkhags", label: "Nearby Dzongkhags", type: "array" },
      ],
    },
    {
      name: "culture",
      label: "Culture",
      type: "object",
      fields: [
        { name: "dzongs", label: "Dzongs", type: "array" },
        { name: "festivals", label: "Festivals", type: "array" },
        { name: "localDish", label: "Local Dish", type: "text" },
      ],
    },
    {
      name: "nature",
      label: "Nature",
      type: "object",
      fields: [
        { name: "trekkingRoutes", label: "Trekking Routes", type: "array" },
        { name: "wildlife", label: "Wildlife", type: "text" },
        { name: "scenicSpots", label: "Scenic Spots", type: "array" },
      ],
    },
    {
      name: "experiences",
      label: "Experiences",
      type: "nestedArray",
      itemFields: [
        { name: "type", label: "Type", type: "text" },
        { name: "activities", label: "Activities", type: "array" },
      ],
    },
    {
      name: "practicalInfo",
      label: "Practical Info",
      type: "object",
      fields: [
        { name: "bestTimeToVisit", label: "Best Time to Visit", type: "array" },
        { name: "accommodation", label: "Accommodation", type: "array" },
        { name: "transportation", label: "Transportation", type: "array" },
      ],
    },
    {
      name: "media",
      label: "Media",
      type: "object",
      fields: [
        { name: "images", label: "Images", type: "array" },
        { name: "video", label: "Video", type: "text" },
      ],
    },
    {
      name: "placesToVisit",
      label: "Places to Visit",
      type: "nestedArray",
      itemFields: [
        { name: "name", label: "Name", type: "text" },
        { name: "image", label: "Image URL", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "rating", label: "Rating", type: "number" },
        { name: "distance", label: "Distance", type: "text" },
      ],
    },
    { name: "usps", label: "USPs", type: "array" },
    {
      name: "meta",
      label: "Meta",
      type: "object",
      fields: [
        { name: "lastUpdated", label: "Last Updated", type: "text" },
        { name: "popularity", label: "Popularity", type: "number" },
      ],
    },
  ];

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/login");
    } else {
      fetchData();
    }
  }, [isLoading, isAuthenticated, user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/packages/popularDestination");
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setData(Array.isArray(result) ? result : []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

  const handleArrayInputChange = (
    fieldName: keyof PopularDestinationItem,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: [
        ...((prev[fieldName] as string[] | undefined) || []),
        value,
      ],
    }));
  };

  const handleRemoveArrayItem = (
    fieldName: keyof PopularDestinationItem,
    index: number
  ) => {
    setFormData((prev) => {
      const arr = [...((prev[fieldName] as string[] | undefined) || [])];
      arr.splice(index, 1);
      return { ...prev, [fieldName]: arr };
    });
  };

  const handleObjectFieldChange = (
    objectName: keyof PopularDestinationItem,
    fieldName: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [objectName]: {
        ...((prev[objectName] as object) || {}),
        [fieldName]: value,
      },
    }));
  };

  const handleNestedObjectFieldChange = (
    parentName: keyof PopularDestinationItem,
    childName: string,
    fieldName: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parentName]: {
        ...((prev[parentName] as Record<string, any>) || {}),
        [childName]: {
          ...((prev[parentName] as Record<string, any>)?.[childName] || {}),
          [fieldName]: value,
        },
      },
    }));
  };

  const handleAddNestedArrayItem = (
    fieldName: keyof PopularDestinationItem,
    item: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: [...((prev[fieldName] as any[] | undefined) || []), item],
    }));
  };

  const handleRemoveNestedArrayItem = (
    fieldName: keyof PopularDestinationItem,
    index: number
  ) => {
    setFormData((prev) => {
      const arr = [...((prev[fieldName] as any[] | undefined) || [])];
      arr.splice(index, 1);
      return { ...prev, [fieldName]: arr };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = `/api/packages/popularDestination${
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
      const response = await fetch(
        `/api/packages/popularDestination?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete item");
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: PopularDestinationItem) => {
    setIsEditing(item);
    setFormData({ ...item });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setFormData({});
  };

  const renderObjectField = (field: FieldConfig, prefix = "") => {
    const fullName = prefix ? `${prefix}.${field.name}` : field.name;

    return (
      <div
        key={fullName}
        className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
      >
        <h4 className="font-medium text-lg mb-2">{field.label}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field.fields?.map((subField) => {
            if (subField.type === "object") {
              return renderObjectField(subField, fullName);
            } else {
              return renderField(subField, fullName);
            }
          })}
        </div>
      </div>
    );
  };

  const renderNestedArrayField = (field: FieldConfig) => {
    const arrayData =
      ((formData as Record<string, any>)[field.name] as any[]) || [];

    return (
      <div key={field.name} className="mt-6">
        <h3 className="text-lg font-semibold mb-3">{field.label}</h3>

        <div className="space-y-4 mb-6">
          {arrayData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-white"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">
                  {field.name === "experiences"
                    ? `Experience ${index + 1}`
                    : field.name === "placesToVisit"
                    ? item.name || `Place ${index + 1}`
                    : `Item ${index + 1}`}
                </h4>
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveNestedArrayItem(
                      field.name as keyof PopularDestinationItem,
                      index
                    )
                  }
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {field.itemFields?.map((subField) =>
                  renderField(subField, `${field.name}.${index}`)
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 bg-blue-50">
          <h4 className="text-md font-medium text-blue-800 mb-3">
            Add New {field.label} Item
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {field.itemFields?.map((subField) => (
              <div key={subField.name}>
                <label className="block mb-1 text-sm font-medium">
                  {subField.label}
                  {subField.required ? "*" : ""}
                </label>
                {subField.type === "text" && (
                  <input
                    type="text"
                    value={newNestedArrayItem[subField.name] || ""}
                    onChange={(e) =>
                      setNewNestedArrayItem({
                        ...newNestedArrayItem,
                        [subField.name]: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    placeholder={subField.label}
                  />
                )}
                {subField.type === "number" && (
                  <input
                    type="number"
                    value={newNestedArrayItem[subField.name] || ""}
                    onChange={(e) =>
                      setNewNestedArrayItem({
                        ...newNestedArrayItem,
                        [subField.name]: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    placeholder={subField.label}
                  />
                )}
                {subField.type === "textarea" && (
                  <textarea
                    value={newNestedArrayItem[subField.name] || ""}
                    onChange={(e) =>
                      setNewNestedArrayItem({
                        ...newNestedArrayItem,
                        [subField.name]: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    rows={3}
                    placeholder={subField.label}
                  />
                )}
                {subField.type === "array" && (
                  <div>
                    <div className="flex mb-2">
                      <input
                        type="text"
                        value={newNestedArrayItem[subField.name]?.[0] || ""}
                        onChange={(e) =>
                          setNewNestedArrayItem({
                            ...newNestedArrayItem,
                            [subField.name]: [e.target.value],
                          })
                        }
                        className="flex-1 p-2 border rounded"
                        placeholder={`New ${subField.label}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              const newItem = { ...newNestedArrayItem };
              handleAddNestedArrayItem(
                field.name as keyof PopularDestinationItem,
                newItem
              );
              setNewNestedArrayItem({});
            }}
            disabled={
              !field.itemFields?.every((f) => newNestedArrayItem[f.name])
            }
            className={`px-4 py-2 rounded-md ${
              !field.itemFields?.every((f) => newNestedArrayItem[f.name])
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Add {field.label} Item
          </button>
        </div>
      </div>
    );
  };

  const renderField = (field: FieldConfig, prefix = "") => {
    const fullName = prefix ? `${prefix}.${field.name}` : field.name;
    const valuePath = prefix ? prefix.split(".") : [];
    valuePath.push(field.name);

    let currentValue: any = formData;
    for (const part of valuePath) {
      if (currentValue && typeof currentValue === "object") {
        currentValue = currentValue[part];
      } else {
        currentValue = undefined;
        break;
      }
    }

    switch (field.type) {
      case "text":
        return (
          <div key={fullName}>
            <label className="block mb-1 font-medium">{field.label}:</label>
            <input
              type="text"
              name={fullName}
              value={(currentValue as string) || ""}
              onChange={(e) => {
                if (prefix.includes(".")) {
                  const [parent, index, child] = prefix.split(".");
                  if (parent && index && child) {
                    const parentField = parent as keyof PopularDestinationItem;
                    const newArray = [
                      ...((formData[parentField] as any[] | undefined) || []),
                    ];
                    newArray[parseInt(index)] = {
                      ...newArray[parseInt(index)],
                      [field.name]: e.target.value,
                    };
                    setFormData((prev) => ({
                      ...prev,
                      [parentField]: newArray,
                    }));
                  } else if (parent && child) {
                    handleObjectFieldChange(
                      parent as keyof PopularDestinationItem,
                      field.name,
                      e.target.value
                    );
                  }
                } else {
                  handleInputChange(e);
                }
              }}
              className="w-full p-2 border rounded"
              required={field.required}
            />
          </div>
        );
      case "number":
        return (
          <div key={fullName}>
            <label className="block mb-1 font-medium">{field.label}:</label>
            <input
              type="number"
              name={fullName}
              value={(currentValue as number) || ""}
              onChange={(e) => {
                if (prefix.includes(".")) {
                  const [parent, index, child] = prefix.split(".");
                  if (parent && index && child) {
                    const parentField = parent as keyof PopularDestinationItem;
                    const newArray = [
                      ...((formData[parentField] as any[] | undefined) || []),
                    ];
                    newArray[parseInt(index)] = {
                      ...newArray[parseInt(index)],
                      [field.name]: Number(e.target.value),
                    };
                    setFormData((prev) => ({
                      ...prev,
                      [parentField]: newArray,
                    }));
                  } else if (parent && child) {
                    handleObjectFieldChange(
                      parent as keyof PopularDestinationItem,
                      field.name,
                      Number(e.target.value)
                    );
                  }
                } else {
                  handleNumberInputChange(e);
                }
              }}
              className="w-full p-2 border rounded"
              required={field.required}
            />
          </div>
        );
      case "textarea":
        return (
          <div key={fullName}>
            <label className="block mb-1 font-medium">{field.label}:</label>
            <textarea
              name={fullName}
              value={(currentValue as string) || ""}
              onChange={(e) => {
                if (prefix.includes(".")) {
                  const [parent, index, child] = prefix.split(".");
                  if (parent && index && child) {
                    const parentField = parent as keyof PopularDestinationItem;
                    const newArray = [
                      ...((formData[parentField] as any[] | undefined) || []),
                    ];
                    newArray[parseInt(index)] = {
                      ...newArray[parseInt(index)],
                      [field.name]: e.target.value,
                    };
                    setFormData((prev) => ({
                      ...prev,
                      [parentField]: newArray,
                    }));
                  } else if (parent && child) {
                    handleObjectFieldChange(
                      parent as keyof PopularDestinationItem,
                      field.name,
                      e.target.value
                    );
                  }
                } else {
                  handleInputChange(e);
                }
              }}
              rows={field.name === "description" ? 4 : 3}
              className="w-full p-2 border rounded"
              required={field.required}
            />
          </div>
        );
      case "array":
        return (
          <div key={fullName}>
            <label className="block mb-1 font-medium">{field.label}:</label>
            <div className="flex mb-2">
              <input
                type="text"
                value={newArrayItem[fullName] || ""}
                onChange={(e) =>
                  setNewArrayItem({
                    ...newArrayItem,
                    [fullName]: e.target.value,
                  })
                }
                className="flex-1 p-2 border rounded-l"
                placeholder={`New ${field.label}`}
              />
              <button
                type="button"
                onClick={() => {
                  if (newArrayItem[fullName]) {
                    if (prefix.includes(".")) {
                      const [parent, index, child] = prefix.split(".");
                      if (parent && index && child) {
                        const parentField =
                          parent as keyof PopularDestinationItem;
                        const newArray = [
                          ...((formData[parentField] as any[] | undefined) ||
                            []),
                        ];
                        newArray[parseInt(index)] = {
                          ...newArray[parseInt(index)],
                          [field.name]: [
                            ...(newArray[parseInt(index)][field.name] || []),
                            newArrayItem[fullName],
                          ],
                        };
                        setFormData((prev) => ({
                          ...prev,
                          [parentField]: newArray,
                        }));
                      } else if (parent && child) {
                        handleObjectFieldChange(
                          parent as keyof PopularDestinationItem,
                          field.name,
                          [
                            ...((currentValue as string[]) || []),
                            newArrayItem[fullName],
                          ]
                        );
                      }
                    } else {
                      handleArrayInputChange(
                        field.name as keyof PopularDestinationItem,
                        newArrayItem[fullName]
                      );
                    }
                    setNewArrayItem({ ...newArrayItem, [fullName]: "" });
                  }
                }}
                className="bg-blue-500 text-white px-4 rounded-r"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {((currentValue as string[]) || []).map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => {
                      if (prefix.includes(".")) {
                        const [parent, indexStr, child] = prefix.split(".");
                        const arrayIndex = parseInt(indexStr);
                        if (parent && !isNaN(arrayIndex) && child) {
                          const parentField =
                            parent as keyof PopularDestinationItem;
                          const newArray = [
                            ...((formData[parentField] as any[] | undefined) ||
                              []),
                          ];
                          const subArray = [
                            ...newArray[arrayIndex][field.name],
                          ];
                          subArray.splice(index, 1); // Here index is already a number from the map function
                          newArray[arrayIndex] = {
                            ...newArray[arrayIndex],
                            [field.name]: subArray,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            [parentField]: newArray,
                          }));
                        } else if (parent && child) {
                          const arr = [...((currentValue as string[]) || [])];
                          arr.splice(index, 1);
                          handleObjectFieldChange(
                            parent as keyof PopularDestinationItem,
                            field.name,
                            arr
                          );
                        }
                      } else {
                        handleRemoveArrayItem(
                          field.name as keyof PopularDestinationItem,
                          index
                        );
                      }
                    }}
                    className="ml-2 text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case "object":
        return renderObjectField(field);
      case "nestedArray":
        return renderNestedArrayField(field);
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
        <title>Edit Popular Destinations - Admin</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6">Edit Popular Destinations</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Destination" : "Add New Destination"}
        </h2>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fieldConfigs
              .filter(
                (f) =>
                  ["text", "number"].includes(f.type) &&
                  ![
                    "location",
                    "culture",
                    "nature",
                    "practicalInfo",
                    "media",
                    "meta",
                  ].includes(f.name)
              )
              .map((field) => renderField(field))}
          </div>

          {fieldConfigs
            .filter(
              (f) =>
                f.type === "textarea" &&
                ![
                  "location",
                  "culture",
                  "nature",
                  "practicalInfo",
                  "media",
                  "meta",
                ].includes(f.name)
            )
            .map((field) => renderField(field))}

          {fieldConfigs
            .filter(
              (f) =>
                f.type === "array" &&
                !["experiences", "placesToVisit"].includes(f.name)
            )
            .map((field) => renderField(field))}

          {fieldConfigs
            .filter((f) => f.type === "object")
            .map((field) => renderField(field))}

          {fieldConfigs
            .filter((f) => f.type === "nestedArray")
            .map((field) => renderField(field))}

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading
                ? "Saving..."
                : isEditing
                ? "Update Destination"
                : "Add Destination"}
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
          Current Popular Destinations
        </h2>

        {loading && !data.length ? (
          <div className="text-center py-8">Loading data...</div>
        ) : data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tagline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
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
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        {item.tagline?.substring(0, 50) || ""}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.tagline?.substring(0, 50) || ""}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.rating}
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
            No destinations found
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPopularDestinationsPage;
