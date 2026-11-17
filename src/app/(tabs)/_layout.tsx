import { tabs } from "@/constants/data";
import clsx from "@/utils/clsx";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";

type TabIconProps = {
  focused: boolean;
  icon: any;
};

const TabIcon = ({ focused, icon }: TabIconProps) => {
  return (
    <View className="items-center justify-center">
      <View
        className={clsx(
          "w-12 h-12 items-center justify-center rounded-full",
          focused ? "bg-[#ea7a53]" : "bg-transparent"
        )}
      >
        <Image
          source={icon}
          style={{
            width: 22,
            height: 22,
            tintColor: "#ffffff",
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          marginHorizontal: 20,
          height: 66,
          borderRadius: 50,
          backgroundColor: "#081126",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
          paddingBottom: 0,
          paddingTop: 0,
          paddingHorizontal: 8,
        },
        tabBarItemStyle: {
          height: 66,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarIconStyle: {
          flex: 1,
          width: "100%",
          height: "100%",
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
