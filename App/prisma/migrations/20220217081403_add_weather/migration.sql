-- CreateTable
CREATE TABLE "WeatherStation" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "altitude" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "weatherStationId" INTEGER NOT NULL,
    "rainy" INTEGER,
    "prcpt15m" INTEGER,
    "prcpt60m" INTEGER,
    "prcpt3h" INTEGER,
    "prcpt6h" INTEGER,
    "prcpt12h" INTEGER,
    "prcpt24h" INTEGER,
    "temp" DOUBLE PRECISION,
    "windSpeed1h" DOUBLE PRECISION,
    "windSpeed10h" DOUBLE PRECISION,
    "humidity" INTEGER,
    "pressure" DOUBLE PRECISION,
    "observedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weather" ADD FOREIGN KEY ("weatherStationId") REFERENCES "WeatherStation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
