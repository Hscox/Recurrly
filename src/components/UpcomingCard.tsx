import { Image, Text, View } from "react-native";

interface UpcomingCardProps {
  item: {
    id: string;
    name: string;
    price: string;
    dueDate: string;
    icon: any;
  };
}

export default function UpcomingCard({ item }: UpcomingCardProps) {
  return (
    <View className="upcoming-card">
      <View className="upcoming-row">
        <Image
          source={item.icon}
          className="upcoming-icon"
          style={{ width: 56, height: 56 }}
          resizeMode="contain"
        />
        <View>
          <Text className="upcoming-price">{item.price}</Text>
          <Text className="upcoming-meta">{item.dueDate}</Text>
        </View>
      </View>
      <Text className="upcoming-name" numberOfLines={1}>
        {item.name}
      </Text>
    </View>
  );
}
