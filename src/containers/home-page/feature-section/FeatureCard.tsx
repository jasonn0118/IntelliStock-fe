import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
}

export default function FeatureCard({
  title,
  description,
  link,
}: FeatureCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#1e1e1e",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
          bgcolor: "#2a2a2a",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ mb: 2, fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          <Link
            href={`/${link}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Learn More
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
