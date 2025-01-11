import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import FastImage from 'react-native-fast-image'; // For GIFs
import Sound from 'react-native-sound';
import LottieView from 'lottie-react-native'; // For Lottie animations
import { IModalMedia } from '../../utiltes/Type/Component';
import images from '../../common/images';
import themes from '../../utiltes/Themes';

const ModalMedia: React.FC<IModalMedia> = (Props) => {
    const { visible, onClose, media } = Props;
    const [loading, setLoading] = useState(true);
    const [audio, setAudio] = useState<Sound | null>(null);
    const videoRef = useRef<VideoRef | null>(null);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (visible) {
            setLoading(true);

            if (media?.type === 'audio') {
                const sound = new Sound(media.link, undefined, (error) => {
                    if (visible && !error) {
                        setLoading(false);
                        sound.play((success) => {
                            if (success) {
                                stopMediaAndClose(); // Close modal when sound finishes
                            }
                        });
                        setAudio(sound);
                    }
                });
            } else if (media?.type === 'video' || media?.type === 'gif' || media?.type === 'image') {
                if (visible) {
                    setLoading(false);
                }
            }

            startCloseTimer(); // Start close timer
        } else {
            clearCloseTimer(); // Clear timer when modal is closed
            stopMedia(); // Stop media when modal is closed
        }

        return () => {
            clearCloseTimer();
            stopMedia(); // Ensure media stops when component unmounts or modal is closed
        };
    }, [visible, media]);

    // Start a timer to automatically close the modal after media duration
    const startCloseTimer = () => {
        clearCloseTimer(); // Clear any existing timer before starting a new one
        closeTimeout.current = setTimeout(() => {
            stopMediaAndClose(); // Close modal automatically after media duration
        }, ((media.duration + 2000) || 10) * 1000); // Duration from media or default to 10 seconds
    };

    // Clear any existing close timer
    const clearCloseTimer = () => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
        }
    };

    // Stop the media (audio/video) when modal is closed or media ends
    const stopMedia = () => {
        if (audio) {
            audio.stop(() => {
                audio.release();
                setAudio(null); // Reset audio state
            });
        }
        if (videoRef.current) {
            videoRef.current.seek(0); // Stop video by seeking to the beginning
        }
    };

    // Close modal and stop media
    const stopMediaAndClose = () => {
        stopMedia(); // Stop the audio/video
        onClose();    // Close the modal
    };

    // Render the media based on its type (audio, video, gif, image)
    const renderMedia = () => {
        if (loading) {
            return (
                <LottieView
                    source={images.loading} // Replace with your Lottie file
                    autoPlay
                    loop
                    style={styles.lottie}
                />
            );
        }

        if (media?.type === 'audio') {
            return (
                <View style={styles.audioContainer}>
                    <Image source={images.mic} style={styles.micIcon} />
                    <Text style={styles.audioText}>Audio Playing...</Text>
                </View>
            );
        } else if (media?.type === 'video') {
            return (

                <Video
                    ref={videoRef}
                    source={{ uri: media.link }}
                    style={styles.mediaPlayer}
                    controls={true}
                    resizeMode="none"
                    onEnd={stopMediaAndClose}
                />

            );
        } else if (media?.type === 'gif') {
            return (
                <FastImage
                    source={{ uri: media.link }}
                    style={styles.gif}
                    resizeMode={FastImage.resizeMode.contain}
                />
            );
        } else if (media?.type === 'image') {
            return (
                <Image
                    source={{ uri: media.link }}
                    style={styles.image}
                    resizeMode="contain"
                />
            );
        }
        return null;
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={stopMediaAndClose} // Close modal on back press
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {renderMedia()}
                    <TouchableOpacity style={styles.closeButton} onPress={stopMediaAndClose}>
                        <Text style={styles.closeText}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '95%',
        padding: 20,
        backgroundColor: themes.white,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 0, // Ensure no shadow
        shadowColor: 'transparent', // Remove shadow color
        shadowOpacity: 0, // Remove shadow opacity
    },
    lottie: {
        width: 100,
        height: 100,
    },
    audioContainer: {
        alignItems: 'center',
    },
    micIcon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    audioText: {
        fontSize: 16,
        marginBottom: 10,
    },
    mediaPlayer: {
        width: 350,
        height: 220,
        marginVertical: 22,
        borderRadius: 10,
        backgroundColor: 'transparent',
    },
    image: {
        width: 350,
        height: 220,
        marginVertical: 22,
        borderRadius: 10,
    },
    gif: {
        width: 350,
        height: 220,
        marginVertical: 22,
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        color: themes.white,
        fontSize: 16,
    },
});

export default ModalMedia;
