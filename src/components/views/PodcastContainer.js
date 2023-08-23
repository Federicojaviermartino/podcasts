import React from "react";
import { Grid, Placeholder } from "semantic-ui-react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import { isOutdated } from "../utils/Utils";
import PodcastInfo from "../podcasts/PodcastInfo";
import DetailsPodcast from "../podcasts/DetailsPodcast";
import DetailsEpisode from "../podcasts/DetailsEpisode";
import api from "../../api";

class PodcastContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      podcast: {
        episodes: []
      },
      error: false
    };
  }

  componentDidMount = () => {
    this.props.isLoading(true);

    const podcastKey = `podcast${this.props.match.params.podcastId}`;

    if (
      localStorage.getItem(podcastKey) === null ||
      isOutdated(JSON.parse(localStorage.getItem(podcastKey)).timestamp)
    ) {
      api.podcasts
        .getPodcast(this.props.match.params.podcastId)
        .then(podcast => {
          if (!podcast) {
            console.error("Podcast not found.");
            this.setState({ error: true });
            this.props.isLoading(false);
            return;
          }
          api.podcasts.getEpisodes(podcast).then(episodes => {
            if (!episodes) {
              console.error("Episodes not found.");
              this.setState({ error: true });
              this.props.isLoading(false);
              return;
            }
            podcast.episodes = episodes;
            podcast.description = this.props.location.state.podcast.summary;
            this.setState({ podcast });
            let lsObject = { value: podcast, timestamp: new Date().getTime() };
            try {
              localStorage.setItem(podcastKey, JSON.stringify(lsObject));
            } catch (e) {
              console.log("Local Storage is full, please empty data: " + e);
            }

            this.props.isLoading(false);
          });
        });
    } else {
      let lsPodcast = JSON.parse(localStorage.getItem(podcastKey)).value;
      this.setState({ podcast: lsPodcast });
      this.props.isLoading(false);
    }
  };

  render() {
    if (this.state.error) {
      return <h2>Something went wrong, check the console</h2>;
    }
    return (
      <Grid>
        <Grid.Column width={4}>
          {this.props.loading ? (
            <Placeholder>
              <Placeholder.Image square />
            </Placeholder>
          ) : (
            <PodcastInfo podcast={this.state.podcast} />
          )}
        </Grid.Column>
        <Grid.Column width={12}>
          <Route
            path={this.props.match.url}
            exact
            render={() => (
              <DetailsPodcast {...this.props} podcast={this.state.podcast} />
            )}
          />
          <Route
            path={`${this.props.match.url}/episodes/:episodeId`}
            component={DetailsEpisode}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(PodcastContainer);
