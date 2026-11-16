import React from 'react';
import { Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '@/constants/icons';
import { detectBrand, getInitials, getMonogramBackground } from '@/utils/subscriptionUtils';

interface SubscriptionIconProps {
  item: {
    name?: string;
    category?: string;
    icon?: any;
    imageUrl?: string;
    iconType?: 'image' | 'vector' | 'monogram';
    vectorIcon?: string;
    monogram?: string;
    iconBg?: string;
    iconColor?: string;
  };
  size?: number;
}

export default function SubscriptionIcon({ item, size = 56 }: SubscriptionIconProps) {
  const name = item.name || '';
  const detected = detectBrand(name);

  // 1. If custom image URL
  if (item.imageUrl || (item.icon && typeof item.icon === 'object' && item.icon.uri)) {
    const source = item.imageUrl ? { uri: item.imageUrl } : item.icon;
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 14,
          backgroundColor: '#ffffff',
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <Image
          source={source}
          style={{
            width: size,
            height: size,
          }}
          resizeMode="cover"
        />
      </View>
    );
  }

  // 2. If valid bundled image (not empty wallet placeholder)
  if (item.icon && item.icon !== icons.wallet) {
    return (
      <Image
        source={item.icon}
        style={{
          width: size,
          height: size,
          borderRadius: 12,
        }}
        resizeMode="contain"
      />
    );
  }

  // 3. If brand detected with bundled image (e.g. Gemini, Claude, Spotify, Netflix)
  if (detected?.icon && detected.iconType === 'image') {
    return (
      <Image
        source={detected.icon}
        style={{
          width: size,
          height: size,
          borderRadius: 12,
        }}
        resizeMode="contain"
      />
    );
  }

  // 4. If brand detected with vector icon
  if (detected?.iconType === 'vector' && detected.vectorIcon) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 14,
          backgroundColor: detected.iconBg || '#0f172a',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <Ionicons
          name={detected.vectorIcon as any}
          size={size * 0.5}
          color={detected.iconColor || '#ffffff'}
        />
      </View>
    );
  }

  // 5. If item has explicit vector icon
  if (item.iconType === 'vector' && item.vectorIcon) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 14,
          backgroundColor: item.iconBg || '#0f172a',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <Ionicons
          name={item.vectorIcon as any}
          size={size * 0.5}
          color={item.iconColor || '#ffffff'}
        />
      </View>
    );
  }

  // 6. If brand detected with monogram
  if (detected?.iconType === 'monogram' && detected.monogram) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 14,
          backgroundColor: detected.iconBg || getMonogramBackground(name, item.category),
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <Text
          style={{
            color: detected.iconColor || '#ffffff',
            fontSize: size * 0.38,
            fontFamily: 'sans-bold',
            letterSpacing: 0.5,
          }}
        >
          {detected.monogram}
        </Text>
      </View>
    );
  }

  // 7. If explicit custom monogram
  if (item.iconType === 'monogram' && item.monogram) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 14,
          backgroundColor: item.iconBg || getMonogramBackground(name, item.category),
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <Text
          style={{
            color: item.iconColor || '#ffffff',
            fontSize: size * 0.38,
            fontFamily: 'sans-bold',
            letterSpacing: 0.5,
          }}
        >
          {item.monogram}
        </Text>
      </View>
    );
  }

  // 8. Ultimate fallback: Dynamic stylish monogram
  const initials = getInitials(name);
  const bg = getMonogramBackground(name, item.category);

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 14,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      <Text
        style={{
          color: '#ffffff',
          fontSize: size * 0.38,
          fontFamily: 'sans-bold',
          letterSpacing: 0.5,
        }}
      >
        {initials}
      </Text>
    </View>
  );
}
