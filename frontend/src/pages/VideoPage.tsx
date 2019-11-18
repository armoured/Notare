import React from "react";
import Box from "@material-ui/core/Box";
import { styled as materialStyled } from "@material-ui/core/styles";
import { GREY_COLOR, RED_COLOR, PINK_COLOR } from "../colorConstants";
import { VideoType } from "../types";
import { getVideos } from "../api/videos";
import { addCategory, getCategories, changeVideoCategory } from "../api/categories";
import { sortStringArray } from "../utils/stringUtils";
import CategoryLabel from "../components/CategoryLabel";
import AddCategory from "../components/AddCategory";
import Button from 'react-bootstrap/Button';
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import VideoComponent from "../components/Video";


const FontStyleComponent = materialStyled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

const GreyFont = materialStyled(Box)({
  color: GREY_COLOR
});

interface Props {}

interface State {
  videos: Array<VideoType>;
  searchedVideos: Array<VideoType>;
  categories: Array<string>;
  selectedCategories: Array<string>;
  deleteMode: boolean;
}

class VideoPage extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      videos: [],
      searchedVideos: [],
      categories: [],
      selectedCategories: [],
      deleteMode: false,
    };
  }

  getVideos = async () => {
    const response = await getVideos({ sort: "-last_edited" });
    response &&
      this.setState({
        videos: response.videos,
        searchedVideos: response.videos
      });
  };

  getCategories = async () => {
    const response = await getCategories();
    response && this.setState({ categories: response.tags });
  };

  onChangeCategory = async (video_id: string, category: string) => {
    await changeVideoCategory({ tag: category }, video_id);
    await this.getVideos();
  };

  async componentDidMount() {
    await this.getVideos();
    await this.getCategories();
  }

  updateSearchedVideos(searchedVideos: Array<VideoType>) {
    this.setState({ searchedVideos: searchedVideos });
  }

  onDeselectCategory(category: string){
    this.setState((state: State) => {
      const newSelected = state.selectedCategories.filter(c => c !== category);
      return {
        selectedCategories: newSelected,
      }
    })
  }

  onSelectCategory(category: string){
    if (!this.state.selectedCategories.includes(category)){
      this.setState((state: State) => {
        const newSelected = [...state.selectedCategories, category];
        return {
          selectedCategories: newSelected,
        }
      })
    }
  }

  onToggleDeleteMode(e: any) {
    this.setState((state: State) => ({
      deleteMode: !state.deleteMode,
    }));
  }

  async onAddNewCategory(category: string){
    await addCategory({tag: category});
    await this.getCategories();
  }

  renderCategoryLabels(){
    const { categories, selectedCategories, deleteMode } = this.state
    return (
      <Box>
        <Box display="flex" flexDirection="row">
          <Box><h3 style={{ color: RED_COLOR }}>Your Categories</h3></Box>
          <Box ml={2}>
            <Button size="sm" variant={deleteMode ? "success" : "secondary"} onClick={this.onToggleDeleteMode.bind(this)}>
              {deleteMode ? "Finish Deleting" : "Delete Categories"}
            </Button>
           </Box>
        </Box>

        
        <Box display="flex" flexDirection="row" alignItems="center">
          {sortStringArray(categories).map(category =>
            <CategoryLabel key={category} category={category}
              deleteMode={deleteMode} 
              selected={selectedCategories.includes(category)}
              onSelectCategory={this.onSelectCategory.bind(this)}
              onDeselectCategory={this.onDeselectCategory.bind(this)}
          />)}
           {!deleteMode && (<AddCategory onAdd={this.onAddNewCategory.bind(this)}/>)}
        </Box>
      
      </Box>
    )

  }

  renderMain() {
    const { categories, videos } = this.state;
    const numVideos = videos.length;
    if (numVideos) {
      return (
        <Box display="flex" flexWrap="wrap">
          {this.state.searchedVideos.map(video => (
            <VideoComponent key={video.video_id} video={video} categories={categories} onChangeCategory={this.onChangeCategory.bind(this)}/> // TODO: update to actually pull in data
          ))}
        </Box>
      );
    }

    return (
      <GreyFont
        display="flex"
        style={{ height: "100%" }}
        alignItems="center"
        flexDirection="center"
        justifyContent="center"
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Box>Looks like you have no videos yet!</Box>
          <Box mt={4}>
            Make sure to install the Chrome extension and head to Youtube to get
            started.
          </Box>
        </Box>
      </GreyFont>
    );
  }

  render() {
    const email = localStorage.getItem("email") || "";

    return (
      <FontStyleComponent p={3}>
        <Navbar email={email} />
        <Search
          components={this.state.videos}
          updateSearchedComponents={this.updateSearchedVideos.bind(this)}
          searchType="videos"
          categorySearch={this.state.selectedCategories}
        />
        <Box>
          {this.renderCategoryLabels()}
          <h3 style={{ color: RED_COLOR }}>Recent Videos</h3>
          {this.renderMain()}
        </Box>
      </FontStyleComponent>
    );
  }
}

export default VideoPage;
