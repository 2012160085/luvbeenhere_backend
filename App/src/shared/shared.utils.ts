import AWS from "aws-sdk";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

export const uploadPhoto = (async (file, userId) => {
    console.log("Call uploadPhoto");
    const { filename, createReadStream } = await file;
    const readStream = createReadStream();
    const objectName = `${userId}-${Date.now()}-${filename}`;
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