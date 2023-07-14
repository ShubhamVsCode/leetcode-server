export const isObjectId = (str) => {
  return mongoose.Types.ObjectId.isValid(str);
};
