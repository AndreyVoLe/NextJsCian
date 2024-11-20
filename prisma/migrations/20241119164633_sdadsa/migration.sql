/*
  Warnings:

  - A unique constraint covering the columns `[propertyId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyId]` on the table `Rates` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyId]` on the table `SellerInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Location_propertyId_key" ON "Location"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "Rates_propertyId_key" ON "Rates"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "SellerInfo_propertyId_key" ON "SellerInfo"("propertyId");

-- RenameForeignKey
ALTER TABLE "Location" RENAME CONSTRAINT "Location_propertyId_fkey" TO "locProp";

-- RenameForeignKey
ALTER TABLE "Rates" RENAME CONSTRAINT "Rates_propertyId_fkey" TO "rateProp";

-- RenameForeignKey
ALTER TABLE "SellerInfo" RENAME CONSTRAINT "SellerInfo_propertyId_fkey" TO "sellProp";
