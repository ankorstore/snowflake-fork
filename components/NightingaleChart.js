// @flow

import React, { useContext } from "react";
import * as d3 from "d3";
import { milestones } from "../constants";
import type { TrackId, MilestoneMap } from "../constants";
import AppContext from "../context/AppContext";
const width = 400;
// we'll draw the '0' milestone with a circle, not an arc.
const arcMilestones = milestones.slice(1);
type Props = {
  milestoneByTrack: MilestoneMap,
  focusedTrackId: TrackId,
  handleTrackMilestoneChangeFn: (TrackId, Milestone: Milestone) => void,
};

const NightingaleChart = (props: Props) => {
  const { data } = useContext(AppContext);
  const { tracks, categoryColorScale, trackIds } = data;
  const currentMilestoneId = props.milestoneByTrack[props.focusedTrackId];

  // TODO: Remove or find way how to use it in the component
  // const colorScale = d3.scaleSequential(d3.interpolateWarm).domain([0, 5]);

  const radiusScale = d3
    .scaleBand()
    .domain(arcMilestones)
    .range([0.15 * width, 0.45 * width])
    .paddingInner(0.1);

  const arcFn = d3
    .arc()
    .innerRadius((milestone) => radiusScale(milestone))
    .outerRadius(
      (milestone) => radiusScale(milestone) + radiusScale.bandwidth()
    )
    .startAngle(-Math.PI / trackIds.length)
    .endAngle(Math.PI / trackIds.length)
    .padAngle(Math.PI / 200)
    .padRadius(0.45 * width)
    .cornerRadius(2);

  return (
    <figure>
      <style jsx>{`
        figure {
          margin: 0;
        }
        svg {
          width: ${width}px;
          height: ${width}px;
        }
        .track-milestone {
          fill: #eee;
          cursor: pointer;
        }
        .track-milestone-current,
        .track-milestone:hover {
          stroke: #000;
          stroke-width: 4px;
          stroke-linejoin: round;
        }
      `}</style>
      <svg>
        <g transform={`translate(${width / 2},${width / 2}) rotate(-33.75)`}>
          {trackIds.map((trackId, i) => {
            const isCurrentTrack = trackId === props.focusedTrackId;
            return (
              <g
                key={trackId}
                transform={`rotate(${(i * 360) / trackIds.length})`}
              >
                {arcMilestones.map((milestone) => {
                  const isCurrentMilestone =
                    isCurrentTrack && milestone === currentMilestoneId;
                  const isMet =
                    props.milestoneByTrack[trackId] >= milestone ||
                    milestone === 0;
                  return (
                    <path
                      key={milestone}
                      className={
                        "track-milestone " +
                        (isMet ? "is-met " : " ") +
                        (isCurrentMilestone ? "track-milestone-current" : "")
                      }
                      onClick={() =>
                        props.handleTrackMilestoneChangeFn(trackId, milestone)
                      }
                      d={arcFn(milestone)}
                      style={{
                        fill: isMet
                          ? categoryColorScale(tracks[trackId].category)
                          : undefined,
                      }}
                    />
                  );
                })}
                <circle
                  r="8"
                  cx="0"
                  cy="-50"
                  style={{
                    fill: categoryColorScale(tracks[trackId].category),
                  }}
                  className={
                    "track-milestone " +
                    (isCurrentTrack && !currentMilestoneId
                      ? "track-milestone-current"
                      : "")
                  }
                  onClick={() => props.handleTrackMilestoneChangeFn(trackId, 0)}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </figure>
  );
};

export default NightingaleChart;
