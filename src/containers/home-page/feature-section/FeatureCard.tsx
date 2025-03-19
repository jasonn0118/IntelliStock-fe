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
    <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{ height: 156 }}>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions sx={{ mt: 1 }}>
        <Button size="small" variant="outlined">
          <Link href={`/${link}`}>Learn More</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
