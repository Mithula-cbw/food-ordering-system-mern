// components/skeletons/ProductSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 flex justify-center">
      <div className="bg-white w-full lg:w-[90%] mx-auto p-2 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Image Section */}
          <div className="space-y-4 lg:col-span-1">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <div className="flex space-x-2 overflow-x-auto">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-16 h-16 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-5 lg:col-span-3 lg:pl-12">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-full rounded-md" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-12 w-12 rounded-md" />
              <Skeleton className="h-12 w-12 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
