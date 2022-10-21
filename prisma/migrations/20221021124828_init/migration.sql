-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "todoTask" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
