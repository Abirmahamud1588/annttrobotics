import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productsSlice";
import {
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const MultiStageForm = ({ onProductAdded }) => {
  const {
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { isValid },
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [photos, setPhotos] = useState([]);

  const steps = [
    "Product Details",
    "Inventory Details",
    "Add Photos",
    "Review",
  ];

  const generateUniqueId = () => {
    return `id_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };

  const onSubmit = (data) => {
    if (activeStep === steps.length - 1) {
      const productWithId = { ...data, photos, id: generateUniqueId() };
      dispatch(addProduct(productWithId));
      setActiveStep(0);
      setPhotos([]);
      onProductAdded(); // Notify parent component of the new product
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files);
    const photoPreviews = files.map((file) => URL.createObjectURL(file));
    setPhotos(photoPreviews);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Product Details Form */}
      {activeStep === 0 && (
        <div>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: "Product Title is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Product Title"
                fullWidth
                sx={{ mb: 2 }}
                error={!!error}
                helperText={error ? error.message : null}
                required
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: "Product Description is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Product Description"
                fullWidth
                sx={{ mb: 2 }}
                error={!!error}
                helperText={error ? error.message : null}
                required
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={{ required: "Category is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Category"
                fullWidth
                sx={{ mb: 2 }}
                error={!!error}
                helperText={error ? error.message : null}
                required
              />
            )}
          />
          <Controller
            name="regularPrice"
            control={control}
            defaultValue=""
            rules={{ required: "Regular Price is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Regular Price"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
                error={!!error}
                helperText={error ? error.message : null}
                required
              />
            )}
          />
          <Controller
            name="extraPrice"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Extra Price"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="taxAmount"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Tax Amount"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />
        </div>
      )}

      {/* Inventory Details  */}
      {activeStep === 1 && (
        <div>
          <Controller
            name="weight"
            control={control}
            defaultValue=""
            rules={{ required: "Weight is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Weight"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
                error={!!error}
                helperText={error ? error.message : null}
                required
              />
            )}
          />
          <Controller
            name="length"
            control={control}
            defaultValue=""
            rules={{ required: "Length is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Length"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
                error={!!error}
                helperText={error ? error.message : null}
                required
              />
            )}
          />
          <Controller
            name="height"
            control={control}
            defaultValue=""
            rules={{ required: "Height is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Height"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
                error={!!error}
                helperText={error ? error.message : null}
                required
              />
            )}
          />
          <Controller
            name="width"
            control={control}
            defaultValue=""
            rules={{ required: "Width is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Width"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
                error={!!error}
                helperText={error ? error.message : null}
                required
              />
            )}
          />
          <Controller
            name="totalStock"
            control={control}
            defaultValue=""
            rules={{ required: "Total Stock is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Total Stock"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
                error={!!error}
                helperText={error ? error.message : null}
                required
              />
            )}
          />
        </div>
      )}

      {/* Add Photos */}
      {activeStep === 2 && (
        <div>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-photo"
            multiple
            type="file"
            onChange={handlePhotoChange}
          />
          <label htmlFor="upload-photo">
            <Button
              variant="contained"
              component="span"
              startIcon={<PhotoCamera />}
            >
              Upload Photos
            </Button>
          </label>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {photos.map((photo, index) => (
              <Grid item xs={4} key={index}>
                <img
                  src={photo}
                  alt={`Preview ${index}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {/* Review  step of info*/}
      {activeStep === 3 && (
        <div>
          <Typography variant="h6" gutterBottom>
            Review Your Details
          </Typography>
          <Typography variant="body1">Title: {getValues("title")}</Typography>
          <Typography variant="body1">
            Description: {getValues("description")}
          </Typography>
          <Typography variant="body1">
            Category: {getValues("category")}
          </Typography>
          <Typography variant="body1">
            Regular Price: ${getValues("regularPrice")}
          </Typography>
          <Typography variant="body1">
            Extra Price: ${getValues("extraPrice")}
          </Typography>
          <Typography variant="body1">
            Tax Amount: ${getValues("taxAmount")}
          </Typography>
          <Typography variant="body1">
            Weight: {getValues("weight")} kg
          </Typography>
          <Typography variant="body1">
            Length: {getValues("length")} cm
          </Typography>
          <Typography variant="body1">
            Height: {getValues("height")} cm
          </Typography>
          <Typography variant="body1">
            Width: {getValues("width")} cm
          </Typography>
          <Typography variant="body1">
            Total Stock: {getValues("totalStock")}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Photos
          </Typography>
          <Grid container spacing={2}>
            {photos.map((photo, index) => (
              <Grid item xs={4} key={index}>
                <img
                  src={photo}
                  alt={`Preview ${index}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      <Button
        variant="contained"
        onClick={async () => {
          const isStepValid = await trigger();
          if (isStepValid) {
            handleSubmit(onSubmit)();
          }
        }}
        disabled={!isValid} // Disable button if form is not valid
        sx={{ mt: 2 }}
      >
        {activeStep === steps.length - 1 ? "Finish" : "Next"}
      </Button>
    </Box>
  );
};

export default MultiStageForm;
