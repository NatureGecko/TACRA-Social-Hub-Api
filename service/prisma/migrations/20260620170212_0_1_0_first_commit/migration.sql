-- CreateTable
CREATE TABLE "user_profile" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "bio" TEXT,
    "email" TEXT,
    "social" JSONB[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image_profile" VARCHAR,
    "image_banner" VARCHAR,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_media" (
    "id" SERIAL NOT NULL,
    "bucket" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_profile_id" TEXT NOT NULL,

    CONSTRAINT "user_media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_user_name_key" ON "user_profile"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_email_key" ON "user_profile"("email");

-- AddForeignKey
ALTER TABLE "user_media" ADD CONSTRAINT "user_media_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
