/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import  React ,{useEffect, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Dimensions,ActivityIndicator, ScrollView, StatusBar, FlatList } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { upComingMovies,nowPlayingMovies,popularMovies,baseImagePath } from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';


const {width,height} = Dimensions.get('window');

const getNowPlayingMovieList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  }
  catch (error) {
    console.error('Something went wrong in getNowPlayingMovieList Function ',error);
  }
};

const getUpComingMoviesList = async () => {
  try {
    let response = await fetch(upComingMovies);
    let json = await response.json();
    return json;
  }
  catch (error) {
    console.error('Something went wrong in getUpComingMoviesList Function ',error);
  }
};

const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  }
  catch (error) {
    console.error('Something went wrong in getPopularMoviesList Function ',error);
  }
};

const HomeScreen = ({navigation}:any) => {
  const [nowPlayingMoviesList,setNowPlayingMoviesList] = useState<any>(undefined);
  const [popularMoviesList,setPopularMoviesList] = useState<any>(undefined);
  const [upComingMoviesList,setUpComingMoviesList] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMovieList();
      setNowPlayingMoviesList([{id: 'duumy1'},...tempNowPlaying.results, {id: 'dummy2'}]);

      let tempPopular = await getPopularMoviesList();
      setPopularMoviesList(tempPopular.results);

      let tempUpComing = await getUpComingMoviesList();
      setUpComingMoviesList(tempUpComing.results);

    })();
  },[]);

const searchMoviesFunction = () => {
  navigation.navigate('Search');
};

  if (nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upComingMoviesList == undefined &&
    upComingMoviesList == null
) {
    return (
      <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle = {styles.ScrollViewContainer}>
      <StatusBar hidden/>
      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction = {searchMoviesFunction} />
      </View>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={COLORS.Orange}/>
      </View>
      </ScrollView>
      );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      >
      <StatusBar hidden/>
      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction = {searchMoviesFunction} />
      </View>

      <CategoryHeader title={'Now Playing'} />
      <FlatList
      data={nowPlayingMoviesList}
      keyExtractor={(item :any) => item.id}
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
      decelerationRate={0}
      snapToInterval={width * 0.7 + SPACING.space_36}
      contentContainerStyle={styles.containerGap}
      renderItem={({item,index}) => {
        if (!item.original_title) {
          return (
            <View
            style={{width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2}}
             />
          );
        }
        return (
          <MovieCard
          shouldMarginatedAtEnd= {true}
          cardFunction = {() => {
            navigation.push('MovieDetails',{movieid: item.id});
          }}
          carWidth = {width * 0.7 }
          isFirst = {index == 0 ? true : false}
          isLast = {index == upComingMoviesList?.length - 1 ? true : false}
          title={item.original_title}
          imagePath={baseImagePath('w780', item.poster_path)}
          genre={item.genre_ids.slice(1,4)}
          vote_average = {item.vote_average}
          vote_count ={item.vote_count}
          />
        );
      }
       }
      />
      <CategoryHeader title={'Popular'} />
      <FlatList
      data={popularMoviesList}
      keyExtractor={(item :any) => item.id}
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.containerGap}
      renderItem={({item,index}) =>
      <SubMovieCard
      shouldMarginatedAtEnd= {true}
      cardFunction = {() => {
        navigation.push('MovieDetails',{movieid: item.id});
      }}
      carWidth = {width / 3}
      isFirst = {index == 0 ? true : false}
      isLast = {index == upComingMoviesList?.length - 1 ? true : false}
      title={item.original_title}
      imagePath={baseImagePath('w342', item.poster_path)}
      /> }

      />
      <CategoryHeader title={'Up Coming'} />
      <FlatList
      data={upComingMoviesList}
      keyExtractor={(item :any) => item.id}
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.containerGap}
      renderItem={({item,index}) =>
      <SubMovieCard
      shouldMarginatedAtEnd= {true}
      cardFunction = {() => {
        navigation.push('MovieDetails',{movieid: item.id});
      }}
      carWidth = {width / 3}
      isFirst = {index == 0 ? true : false}
      isLast = {index == upComingMoviesList?.length - 1 ? true : false}
      title={item.original_title}
      imagePath={baseImagePath('w342', item.poster_path)}
      /> }

      />
      </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      backgroundColor: COLORS.Black,
    },
    ScrollViewContainer : {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      alignSelf: 'center',
      justifyContent:'center',
    },
    InputHeaderContainer : {
      marginHorizontal: SPACING.space_36,
      marginTop: SPACING.space_28,
    },
    containerGap: {
      gap: SPACING.space_36,
    },
});

export default HomeScreen;
