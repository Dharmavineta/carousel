"use client";
import { useProductStore } from "@/app/store/store";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

const ImageEdit = () => {
  const {
    product,
    products,
    setProduct,
    setProducts,
    updateImages,
    fetchProducts,
    addImage,
    addSizeChartImage,
    variationProducts,
    sizeChartImageRemove,
    variationImagesGallery,
  } = useProductStore();

  const [prodImages, setProdImages] = useState(product.images);
  const inputRef = useRef<HTMLInputElement>(null);
  const sizeImageRef = useRef<HTMLInputElement>(null);
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const [isSizeDragged, setIsSizeDragged] = useState<boolean>(false);
  const [isVariationDragged, setIsVariationDragged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState();
  const router = useRouter();

  const size_chart_image = product?.meta_data.find(
    (ele: any) => ele.key === "size_chart_image"
  );

  const description = product?.description;

  const regex = /<img src="([^"]*)"/g;
  let match;
  const imageUrls = [];

  while ((match = regex.exec(description)) !== null) {
    imageUrls.push(match[1]);
  }
  console.log(imageUrls);

  const unifiedImages = [
    ...product?.images,
    ...variationProducts.map((prod) => prod.image),
    ...imageUrls.map((src, id) => ({ id: nanoid(), src })),
    ...variationImagesGallery,
  ];

  useEffect(() => {
    setProdImages(product?.images);

    const fetchRes = async () => {
      try {
        const updateResponse = await axios.get(
          `https://02xz.com/wp-json/wc/v3/products/50048`,
          {
            auth: {
              username: "ck_3df3b824b55c0188e1b060289b5df4dacf3f7786",
              password: "cs_8927ec339e47f7f14ad5c19dafac8d19865273cc",
            },
          }
        );
        console.log(updateResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRes();
  }, [product?.images]);

  // --------X----------

  // logic for handling inputs

  const handleAddImage = () => {
    inputRef.current?.click();
  };
  const handleSizeImage = () => {
    sizeImageRef.current?.click();
  };

  // --------X----------

  // --------X----------

  // main image upload

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];

    if (image) {
      setImg((prev) => prev);
      const formData = new FormData();
      formData.append("file", image);
      try {
        toast.promise(addImage(formData), {
          loading: "Adding Image",
          success: "Image Added Successfully!",
          error: "Failed to add image, please try again",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warning("Please input image");
    }
  };

  // --------X----------

  // --------X----------
  // size chart upload
  const handleSizeImageUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const image = event.target.files?.[0];

    if (image) {
      setImg((prev) => prev);
      const formData = new FormData();
      formData.append("file", image);

      try {
        toast.promise(addSizeChartImage(formData, product?.id), {
          loading: "Adding Image",
          success: "Image Added Successfully!",
          error: "Failed to add image, please try again",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warning("Please input image");
    }
  };

  // --------X----------

  // main image drag and drop

  // --------X----------

  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData("img_id", id.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, section: string) => {
    e.preventDefault();
    setIsDragged(false);

    const imgId = e.dataTransfer.getData("img_id");

    const image = product.images.find((img: any) => parseInt(imgId) === img.id);
    setProdImages((prev: any[]) => {
      if (!prev.find((img: any) => img.id === image.id)) {
        toast.success("Image added successfully");
        return [...prev, image];
      } else {
        toast.warning("Image already in the gallery");
        return prev;
      }
    });
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragged(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragged(true);
  };

  // --------X----------

  // "Size Chart Drag Options"

  const handleSizeDrop = (
    e: React.DragEvent<HTMLDivElement>,
    section: string
  ) => {
    e.preventDefault();
    setIsSizeDragged(false);

    const imgId = e.dataTransfer.getData("img_id");

    const image = product.images.find((img: any) => parseInt(imgId) === img.id);
    alert("Image added successfully");
  };

  const handleSizeDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setIsSizeDragged(false);
  };

  const handleSizeDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsSizeDragged(true);
  };
  // --------X----------

  // --------X----------

  // "Variations Chart Drag Options"

  const handleVariationDrop = (
    e: React.DragEvent<HTMLDivElement>,
    section: string
  ) => {
    e.preventDefault();
    setIsVariationDragged(false);

    const imgId = e.dataTransfer.getData("img_id");

    const image = product.images.find((img: any) => parseInt(imgId) === img.id);
    toast("Image added successfully");
  };

  const handleVariationDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setIsVariationDragged(false);
  };

  const handleVariationDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsVariationDragged(true);
  };

  // --------X----------

  // --------X----------

  // Deleting Images

  const handleImageDelete = async (id: number) => {
    setProdImages((prev: any) => prev.filter((img: any) => img.id !== id));
    try {
      toast.promise(updateImages(product?.id, prodImages), {
        loading: "Deleting Image",
        success: "Image Deleted Successfully!",
        error: "Failed to delete image, please try again",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // --------X----------

  // --------X----------

  // Updating Images

  const handleReorder = async (newOrder: any) => {
    setProdImages(newOrder);
    try {
      toast.promise(updateImages(product?.id, newOrder), {
        loading: "Updating Images Order",
        success: "Order Updated Successfully!",
        error: "Failed to update order, please try again",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // --------X----------

  const handleSizeImageDelete = async () => {
    try {
      toast.promise(sizeChartImageRemove(product?.id, product), {
        loading: "Removing Image",
        success: "Image Removed Successfully!",
        error: "Failed to remove image, please try again",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between flex-[10] w-full">
      <input
        onChange={handleImageUpload}
        type="file"
        accept="image/*"
        ref={inputRef}
        hidden
      />
      <input
        onChange={handleSizeImageUpload}
        type="file"
        accept="image/*"
        ref={sizeImageRef}
        hidden
      />
      <div className="flex-[5] flex flex-col gap-y-5">
        <div
          className={cn("shadow-sm p-3 relative")}
          onDrop={(e) => handleDrop(e, "main_gallery")}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {isDragged && (
            <div
              className={cn(
                "absolute top-0 z-[20] left-0 right-0 bottom-0 w-full h-full bg-gray-50 font-bold text-xl flex items-center justify-center"
              )}
            >
              Drop your image here!
            </div>
          )}
          <h1 className="text-sm font-bold mb-2">Main Gallery</h1>
          <div className="flex gap-x-3 overflow-x-scroll whitespace-nowrap w-[46rem] ">
            <div className="flex gap-x-3">
              <div
                onClick={handleAddImage}
                className="w-32 h-32 rounded-md hover:bg-gray-50 border transition-all cursor-pointer duration-200 flex items-center justify-center shadow-sm"
              >
                <Plus className="w-4 h-4" />
              </div>
              <Reorder.Group
                className="flex gap-x-3"
                values={prodImages}
                onReorder={handleReorder}
                axis="x"
              >
                {prodImages.map((img: any, i: number) => (
                  <Reorder.Item
                    key={img.src}
                    value={img}
                    className=" w-32 h-32 relative"
                  >
                    <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 z-10"></div>
                    <div className=" shadow-sm  rounded-xl relative w-full h-full border border-gray-100">
                      <div className="flex gap-x-1 absolute right-0 z-10">
                        <div
                          onClick={() => handleImageDelete(img?.id)}
                          className="right-0 w-3 h-3 cursor-pointer bg-rose-600 flex items-center justify-center"
                        >
                          <X className="text-white w-3 h-3" />
                        </div>
                      </div>

                      <Image
                        src={img.src}
                        alt="image"
                        fill
                        className="rounded-md object-cover w-full h-full"
                      />
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          </div>
        </div>
        <div
          onDrop={(e) => handleSizeDrop(e, "size_gallery")}
          onDragOver={handleSizeDragOver}
          onDragLeave={handleSizeDragLeave}
          className=" shadow-sm p-3 relative"
        >
          {isSizeDragged && (
            <div
              className={cn(
                "absolute top-0 z-[20] left-0 right-0 bottom-0 w-full h-full bg-gray-50 font-bold text-xl flex items-center justify-center"
              )}
            >
              Drop your image here!
            </div>
          )}
          <h1 className="text-sm font-bold mb-4">Size Chart</h1>
          <div className="flex gap-x-3 ">
            <div
              onClick={handleSizeImage}
              className="flex cursor-pointer hover:bg-gray-100 transition-all duration-200"
            >
              <div className="w-32 h-32 rounded-md flex items-center justify-center shadow-md">
                <Plus className="w-4 h-4" />
              </div>
            </div>
            <div className="flex gap-x-3 relative w-32 h-32">
              {size_chart_image && (
                <>
                  <div className=" shadow-sm  rounded-xl relative w-full h-full border border-gray-100">
                    <div className="flex gap-x-1 absolute right-0 z-10">
                      <div
                        onClick={handleSizeImageDelete}
                        className="right-0 w-3 h-3 cursor-pointer bg-rose-600 flex items-center justify-center"
                      >
                        <X className="text-white w-3 h-3" />
                      </div>
                    </div>

                    <Image
                      src={size_chart_image?.value}
                      alt="image"
                      fill
                      className="rounded-md object-cover w-full h-full"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          onDrop={(e) => handleVariationDrop(e, "size_gallery")}
          onDragOver={handleVariationDragOver}
          onDragLeave={handleVariationDragLeave}
          className=" shadow-sm p-3 relative "
        >
          {isVariationDragged && (
            <div
              className={cn(
                "absolute top-0 z-[20] left-0 right-0 bottom-0 w-full h-full bg-gray-50 font-bold text-xl flex items-center justify-center"
              )}
            >
              Drop your image here!
            </div>
          )}
          <h1 className="text-sm font-bold">Variations</h1>
          <div className="flex gap-x-3 overflow-x-scroll whitespace-nowrap w-[46rem] ">
            <div className="flex gap-x-3">
              <div
                onClick={handleAddImage}
                className="w-32 h-32 rounded-md hover:bg-gray-50 border transition-all cursor-pointer duration-200 flex items-center justify-center shadow-sm"
              >
                <Plus className="w-4 h-4" />
              </div>
              <div className="flex gap-x-3">
                {variationProducts.map((img: any, i: number) => {
                  return (
                    <div key={img.src} className=" w-32 h-32 relative">
                      <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 z-10"></div>
                      <div className=" shadow-sm  rounded-xl relative w-full h-full border border-gray-100">
                        <div className="flex gap-x-1 absolute right-0 z-10">
                          <div
                            onClick={() => handleImageDelete(img?.id)}
                            className="right-0 w-3 h-3 cursor-pointer bg-rose-600 flex items-center justify-center"
                          >
                            <X className="text-white w-3 h-3" />
                          </div>
                        </div>

                        <Image
                          src={img?.image?.src}
                          alt="image"
                          fill
                          className="rounded-md object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[4] border-l w-full overflow-auto ">
        <div className="flex justify-center mt-2">
          <Label className="font-bold text-center">Image Pool</Label>
        </div>
        <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-y-3">
          {product &&
            unifiedImages.map((img: any, i: number) => (
              <div
                draggable={true}
                onDragStart={(e) => handleDragStart(e, img.id)}
                className=" shadow-sm rounded-xl relative w-32 h-32 border border-gray-100"
                key={img.src}
              >
                <Image src={img.src} alt="image" fill className="rounded-md" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageEdit;
