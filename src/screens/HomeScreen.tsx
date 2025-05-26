import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, Text, Dimensions, Modal, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import moviesData from '../data/movies.json';
import { MovieData, AspectRatio } from '../types/movie';
import SectionTitle from '../components/SectionTitle';
import HorizontalMovieList from '../components/HorizontalMovieList';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MovieData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Simula carga asíncrona
    setTimeout(() => {
      try {
        setData(moviesData as MovieData);
        setLoading(false);
      } catch (e) {
        setError('Error al cargar los datos');
        setLoading(false);
      }
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD600" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error || 'Error desconocido'}</Text>
      </View>
    );
  }

  const trending = data.containers.find(c => c.id === 'trending');
  const youMightLike = data.containers.find(c => c.id === 'you-might-like');
  const myList = data.containers.find(c => c.id === 'my-list');
  const featuredMovie = trending?.items[0];
  let aspectRatio = 2 / 3;
  if (featuredMovie?.posters?.portrait?.aspectRatio) {
    const [w, h] = featuredMovie.posters.portrait.aspectRatio.split('/').map(Number);
    if (w && h) aspectRatio = Number(w) / Number(h);
  }

  return (
    <ScrollView style={styles.container}>
      {/* Cover destacado */}
      {featuredMovie && (
        <TouchableOpacity activeOpacity={0.9} onPress={() => setModalVisible(true)}>
          <ImageBackground
            source={{ uri: trending.layout === 'portrait-card' ? featuredMovie.posters.portrait.url : featuredMovie.posters.landscape.url }}
            style={{
              width: '100%',
              aspectRatio: aspectRatio,
              justifyContent: 'flex-end',
              marginBottom: 16,
              borderBottomLeftRadius: 24,
              borderBottomRightRadius: 24,
              overflow: 'hidden',
            }}
          >
            <View style={styles.overlay} />
            <View style={styles.featuredMeta}>
              <Text style={styles.featuredTitle}>{featuredMovie.title}</Text>
              <View style={styles.featuredMetaData}>
                <Text style={styles.metaText}>{featuredMovie.year}</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>{featuredMovie.duration}</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>{featuredMovie.rating}</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>{featuredMovie.quality}</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.classification}>{featuredMovie.classification.rating}</Text>
              </View>
              {featuredMovie.classification.advisoryContent && featuredMovie.classification.advisoryContent.length > 0 && (
                <View style={styles.advisoryContainer}>
                  {featuredMovie.classification.advisoryContent.map((advisory, idx) => (
                    <Text key={idx} style={styles.advisoryText}>{advisory}</Text>
                  ))}
                </View>
              )}
              <Text style={styles.featuredDesc} numberOfLines={3}>{featuredMovie.description}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}

      {/* Modal para descripción completa */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{featuredMovie?.title}</Text>
            <ScrollView>
              <Text style={styles.modalDescription}>{featuredMovie?.description}</Text>
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Sección You Might Like */}
      {youMightLike && (
        <View style={styles.section}>
          <SectionTitle title={youMightLike.title} />
          <HorizontalMovieList
            movies={youMightLike.items}
            aspectRatio={AspectRatio.Thumbnail}
            cardWidth={120}
          />
        </View>
      )}

      {/* Sección My List */}
      {myList && (
        <View style={styles.section}>
          <SectionTitle title={myList.title} />
          <HorizontalMovieList
            movies={myList.items}
            aspectRatio={AspectRatio.Landscape}
            cardWidth={180}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginTop: 12,
  },
  featuredImage: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  featuredMeta: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    zIndex: 2,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  featuredDesc: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  section: { marginTop: 16, marginBottom: 8 },
  featuredMetaData: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 2,
  },
  metaDot: {
    color: '#fff',
    fontSize: 15,
    marginHorizontal: 2,
    opacity: 0.7,
  },
  classification: {
    color: '#FFD600',
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 214, 0, 0.15)',
  },
  advisoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  advisoryText: {
    color: '#FFD600',
    fontSize: 12,
    backgroundColor: 'rgba(255, 214, 0, 0.10)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#222',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxHeight: '70%',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalDescription: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#FFD600',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;