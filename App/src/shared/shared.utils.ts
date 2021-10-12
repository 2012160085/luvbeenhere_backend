import AWS from "aws-sdk";
import cryptoRandomString from 'crypto-random-string';
AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

export const uploadPhoto = (async (file) => {
    console.log("Call uploadPhoto");
    const { filename, createReadStream } = await file;
    const fileExtension = filename.split('.').pop();
    const readStream = createReadStream();
    const randString = cryptoRandomString(64);
    const objectName = `${randString}.${fileExtension}`;
    const upload = new AWS.S3()
        .upload({
            Body: readStream,
            Bucket: "luvbeenhere-images",
            Key: objectName,
            ACL: "public-read",
        })
        .promise()
    console.log("Return uploadPhoto");

    
    return upload;
});

export const date2StrDay = (timeString) => {
    return new Date(timeString).toISOString().slice(0, 10);
}

export const minmaxDateInArr = (arr) => [Math.min(...arr), Math.max(...arr)];

export const averageInArr = arr => arr.reduce((p, c) => p + c, 0) / arr.length;