import { Modal, Box, Typography, Grid } from "@mui/material";

const ProductDetailsModal = ({ product, open, onClose }) => {
  if (!product) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "white",
          margin: "auto",
          width: "90%",
          maxWidth: 500,
          borderRadius: 4,
          boxShadow: 24,
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
        >
          <strong>Title:</strong> {product.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1.5, color: "#555" }}>
          <strong>Description:</strong> {product.description}
        </Typography>
        <Grid container justifyContent={"center"} spacing={2}>
          {product.photos.map((photo, index) => (
            <Grid item xs={4} key={index}>
              <img
                src={photo}
                alt={`Preview ${index}`}
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          ))}
        </Grid>
        <Typography variant="body1" sx={{ mb: 1.5, color: "#555" }}>
          <strong>Category:</strong> {product.category}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1.5, color: "#555" }}>
          <strong>Price:</strong> ${product.regularPrice}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1.5, color: "#555" }}>
          <strong>Available:</strong> {product.totalStock}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ProductDetailsModal;
