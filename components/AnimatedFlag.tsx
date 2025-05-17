// import Colors from '@/theme/colors';
import Colors from '@/theme/colors';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';

type AnimatedFlagProps = {
    isHalfMast: boolean;
};

export default function AnimatedFlag({ isHalfMast }: AnimatedFlagProps) {
    const flagPoleHeight = 200;
    const screenWidth = 350; // Approximate screen width

    // Animation values
    const flagPositionY = useSharedValue(isHalfMast ? flagPoleHeight * 0.4 : 0);
    const waveAnimation = useSharedValue(0);
    const cloud1Position = useSharedValue(-80);
    const cloud2Position = useSharedValue(-80);

    // Handle position change when isHalfMast changes
    useEffect(() => {
        flagPositionY.value = withTiming(
            isHalfMast ? flagPoleHeight * 0.4 : 0,
            { duration: 2000, easing: Easing.inOut(Easing.cubic) }
        );
    }, [isHalfMast, flagPositionY]);

    // Setup wave animation
    useEffect(() => {
        waveAnimation.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
                withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
            ),
            -1, // infinite repeat
            true // reverse
        );

        return () => {
            cancelAnimation(waveAnimation);
        };
    }, [waveAnimation]);

    // Setup cloud animations
    useEffect(() => {
        // First cloud animation
        const animateCloud1 = () => {
            cloud1Position.value = -80;
            cloud1Position.value = withTiming(screenWidth, {
                duration: 15000,
                easing: Easing.linear
            }, () => {
                setTimeout(animateCloud1, 5000);
            });
        };

        // Second cloud animation with delay
        const animateCloud2 = () => {
            cloud2Position.value = -80;
            cloud2Position.value = withTiming(screenWidth, {
                duration: 20000,
                easing: Easing.linear
            }, () => {
                setTimeout(animateCloud2, 8000);
            });
        };

        animateCloud1();
        setTimeout(animateCloud2, 7000);

        return () => {
            cancelAnimation(cloud1Position);
            cancelAnimation(cloud2Position);
        };
    }, [cloud1Position, cloud2Position]);

    // Animated styles
    const flagStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: flagPositionY.value },
                {
                    rotate: `${waveAnimation.value * (isHalfMast ? 3 : 5)}deg`,
                },
            ],
        };
    });

    const flagWaveStyle = useAnimatedStyle(() => {
        // Slight wave effect on the flag itself
        return {
            transform: [
                {
                    scaleX: 1 + waveAnimation.value * 0.02, // subtle horizontal stretch
                },
            ],
        };
    });

    const cloud1Style = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: cloud1Position.value }],
        };
    });

    const cloud2Style = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: cloud2Position.value }],
        };
    });

    return (
        <View style={styles.container}>
            {/* Clouds */}
            <Animated.View style={[styles.cloud, styles.cloud1, cloud1Style]} />
            <Animated.View style={[styles.cloud, styles.cloud2, cloud2Style]} />

            {/* Flag pole */}
            <View style={styles.pole} />

            {/* Flag position */}
            <Animated.View style={[styles.flagPosition, flagStyle]}>
                {/* Placeholder flag image */}
                <Animated.View style={[styles.flagContainer, flagWaveStyle]}>
                    <Image
                        source={{ uri: 'https://cdn11.bigcommerce.com/s-w6fxwapwzi/images/stencil/385x215/uploaded_images/why-are-the-flags-at-half-mast-today-in-america-the-us.jpg?t=1747170341' }}
                        style={styles.flagImage}
                        resizeMode="cover"
                    />
                </Animated.View>
            </Animated.View>

            {/* Pole finial (top ornament) */}
            <View style={styles.finial} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: 150,
        marginTop: 64,
        position: 'relative',
        alignItems: 'flex-start',
    },
    pole: {
        width: 6,
        height: 300,
        backgroundColor: '#808080',
        position: 'absolute',
        left: 0,
        borderRadius: 3,
        zIndex: 1,
    },
    flagPosition: {
        position: 'absolute',
        left: 0,
        top: 10,
        zIndex: 2,
    },
    flagContainer: {
        width: 120,
        height: 64,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    flagBlueBox: {
        width: '40%',
        height: '60%',
        backgroundColor: Colors.patriotic.blue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    starsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
    },
    stripesContainer: {
        flex: 1,
        height: '100%',
    },
    stripe: {
        flex: 1,
    },
    redStripe: {
        backgroundColor: Colors.patriotic.red,
    },
    whiteStripe: {
        backgroundColor: Colors.white,
    },
    finial: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.patriotic.gold,
        position: 'absolute',
        left: -2,
        top: -5,
        zIndex: 3,
    },
    flagImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    cloud: {
        position: 'absolute',
        backgroundColor: 'black',
        borderRadius: 20,
        zIndex: 0,
    },
    cloud1: {
        width: 60,
        height: 25,
        top: 5,
    },
    cloud2: {
        width: 80,
        height: 30,
        top: 20,
    },
});