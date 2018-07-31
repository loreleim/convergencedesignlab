import React from "react";
import { categorizedProjects } from "./project-data";
import style from "./index.module.scss";
import { TweenMax } from "gsap"; // Includes AttrPlugin
// https://svg2jsx.herokuapp.com/

// https://svgr.now.sh/
// - Disable expand props
// - SVGO config:
//    { "plugins": [{ "removeTitle": true }, { "cleanupIDs": false }] }

const maxRadius = 102;
const colors = {
  par: "#99ca41",
  lxd: "#f89926",
  pd: "#b3519f"
};
const numPerPage = 4;

const Project = ({ title, description, partners, tags }) => {
  return (
    <li className={style.project}>
      <div className={style.title}>{title}</div>
      <div className={style.description}>{description}</div>
    </li>
  );
};

export default class Compendium extends React.Component {
  state = {
    selected: null,
    page: 0
  };

  svgRefs = {
    par: {
      circle: React.createRef(),
      text: React.createRef()
    },
    pd: {
      circle: React.createRef(),
      text: React.createRef()
    },
    lxd: {
      circle: React.createRef(),
      text: React.createRef()
    }
  };

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  onMouseDown = e => {
    this.setState({ selected: e.currentTarget.id, page: 0 });
  };

  animateActive(circleElem, textElem, textColor = "#fff") {
    TweenMax.to(circleElem, 0.4, { attr: { r: 0 } });
    TweenMax.to(textElem, 0.2, { attr: { fill: textColor } });
  }

  animateInactive(circleElem, textElem, textColor = "#99ca41") {
    TweenMax.to(circleElem, 0.4, { attr: { r: maxRadius } });
    TweenMax.to(textElem, 0.2, { attr: { fill: textColor } });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSelected = prevState.selected;
    const { selected } = this.state;
    if (prevSelected !== selected) {
      if (prevSelected !== null) {
        const refs = this.svgRefs[prevSelected];
        this.animateInactive(refs.circle.current, refs.text.current, colors[prevSelected]);
      }
      if (selected !== null) {
        const refs = this.svgRefs[selected];
        this.animateActive(refs.circle.current, refs.text.current);
      }
    }
  }

  componentWillUnmount() {
    Object.values(this.svgRefs).map(refs => {
      TweenMax.killTweensOf(refs.circle.current);
      TweenMax.killTweensOf(refs.text.current);
    });
  }

  render() {
    const { selected, page } = this.state;

    let list = null;
    if (selected !== null) {
      const projects = categorizedProjects[selected];
      const numPages = Math.ceil(projects.length / numPerPage);
      const start = page * numPerPage;
      const end = start + numPerPage;
      const items = projects.slice(start, end).map(project => <Project {...project} />);

      list = (
        <div className={style.listContainer}>
          <button
            className={style.previousButton}
            disabled={page === 0}
            onClick={this.previousPage}
          >
            {"«"}
          </button>
          <ul className={style.list}>{items}</ul>
          <button
            className={style.nextButton}
            disabled={page === numPages - 1}
            onClick={this.nextPage}
          >
            {"»"}
          </button>
        </div>
      );
    }

    return (
      <div className={style.container}>
        <svg className={style.svg} viewBox="0 0 526.05 480.202">
          <g id="par" style={{ cursor: "pointer" }} onMouseDown={this.onMouseDown}>
            <circle cx={263.025} cy={128.858} r={121} fill="#99ca41" />
            <circle ref={this.svgRefs.par.circle} cx={263.025} cy={128.858} r={102} fill="#fff" />
            <g ref={this.svgRefs.par.text} id="text" fill="#99ca41">
              <path d="M187.101 92.295a6.303 6.303 0 0 1 0 11.6 10.326 10.326 0 0 1-4.225.8h-2.525v4.3h-5.9v-17.5h8.425a10.335 10.335 0 0 1 4.225.8zm-2.8 7.313a2.206 2.206 0 0 0 0-3.025 2.627 2.627 0 0 0-1.8-.538h-2.15v4.1h2.15a2.622 2.622 0 0 0 1.8-.537zM204.1 96.683a6.152 6.152 0 0 1 1.9 4.962v7.35h-5.25v-1.8q-.974 2.05-3.874 2.05a6.18 6.18 0 0 1-2.762-.562 3.96 3.96 0 0 1-2.313-3.688 3.478 3.478 0 0 1 1.55-3.075 8.462 8.462 0 0 1 4.7-1.05h2.275q-.275-1.6-2.575-1.6a6.458 6.458 0 0 0-1.875.288 5.273 5.273 0 0 0-1.625.787l-1.8-3.725a9.947 9.947 0 0 1 2.837-1.137 13.716 13.716 0 0 1 3.313-.412 8.28 8.28 0 0 1 5.5 1.612zm-4.45 8.837a1.878 1.878 0 0 0 .7-.975v-.95h-1.399q-1.725 0-1.725 1.15a.995.995 0 0 0 .362.788 1.461 1.461 0 0 0 .988.312 1.857 1.857 0 0 0 1.075-.325zM218.25 95.07v5a8.605 8.605 0 0 0-1.25-.1q-2.9 0-2.9 2.95v6.075h-5.649V95.321h5.375v1.474a5.547 5.547 0 0 1 4.425-1.724zM230.301 108.52a7.047 7.047 0 0 1-3.475.725 6.415 6.415 0 0 1-4.425-1.387 5.301 5.301 0 0 1-1.55-4.162v-3.5h-1.875V96.07h1.875v-3.826h5.65v3.826h2.8v4.125h-2.8v3.45a1.377 1.377 0 0 0 .325.974 1.105 1.105 0 0 0 .85.35 2.21 2.21 0 0 0 1.275-.375zM232.088 93.408a2.737 2.737 0 0 1 0-4.125 3.627 3.627 0 0 1 2.463-.813 3.729 3.729 0 0 1 2.474.775 2.49 2.49 0 0 1 .925 2 2.756 2.756 0 0 1-.925 2.138 3.545 3.545 0 0 1-2.474.838 3.627 3.627 0 0 1-2.463-.813zm-.363 1.913h5.65v13.674h-5.65zM243.063 108.345a6.954 6.954 0 0 1-2.875-2.524 7.005 7.005 0 0 1 0-7.338 6.988 6.988 0 0 1 2.875-2.513 9.339 9.339 0 0 1 4.162-.9 8.107 8.107 0 0 1 4.276 1.075 5.583 5.583 0 0 1 2.45 2.975l-4.376 2.15a2.56 2.56 0 0 0-2.375-1.8 2.193 2.193 0 0 0-1.662.7 2.76 2.76 0 0 0-.663 1.975 2.797 2.797 0 0 0 .663 2 2.192 2.192 0 0 0 1.662.7 2.56 2.56 0 0 0 2.375-1.8l4.376 2.15a5.58 5.58 0 0 1-2.45 2.975 8.102 8.102 0 0 1-4.276 1.075 9.34 9.34 0 0 1-4.162-.9zM255.612 93.408a2.737 2.737 0 0 1 0-4.125 3.628 3.628 0 0 1 2.463-.813 3.728 3.728 0 0 1 2.475.775 2.489 2.489 0 0 1 .925 2 2.755 2.755 0 0 1-.925 2.138 3.544 3.544 0 0 1-2.475.838 3.628 3.628 0 0 1-2.463-.813zm-.362 1.913h5.65v13.674h-5.65zM275.838 95.933a6.227 6.227 0 0 1 2.4 2.487 8.339 8.339 0 0 1 0 7.488 6.248 6.248 0 0 1-2.4 2.475 6.575 6.575 0 0 1-3.313.862 4.77 4.77 0 0 1-3.475-1.174v5.774h-5.65V95.321h5.375v1.125a4.769 4.769 0 0 1 3.75-1.375 6.57 6.57 0 0 1 3.313.862zm-3.063 8.212a2.868 2.868 0 0 0 .625-1.975 2.918 2.918 0 0 0-.625-1.987 2.153 2.153 0 0 0-3.2 0 2.913 2.913 0 0 0-.625 1.987 2.863 2.863 0 0 0 .625 1.975 2.178 2.178 0 0 0 3.2 0zM292.175 96.683a6.152 6.152 0 0 1 1.9 4.962v7.35h-5.25v-1.8q-.976 2.05-3.875 2.05a6.182 6.182 0 0 1-2.763-.562 3.963 3.963 0 0 1-2.312-3.688 3.48 3.48 0 0 1 1.55-3.075 8.463 8.463 0 0 1 4.7-1.05h2.275q-.275-1.6-2.575-1.6a6.453 6.453 0 0 0-1.875.288 5.268 5.268 0 0 0-1.625.787l-1.8-3.725a9.944 9.944 0 0 1 2.837-1.137 13.72 13.72 0 0 1 3.313-.412 8.28 8.28 0 0 1 5.5 1.612zm-4.45 8.837a1.876 1.876 0 0 0 .7-.975v-.95h-1.4q-1.725 0-1.725 1.15a.997.997 0 0 0 .362.788 1.464 1.464 0 0 0 .988.312 1.857 1.857 0 0 0 1.074-.325zM306.6 108.52a7.05 7.05 0 0 1-3.475.725 6.414 6.414 0 0 1-4.425-1.387 5.301 5.301 0 0 1-1.55-4.162v-3.5h-1.875V96.07h1.875v-3.826h5.65v3.826h2.8v4.125h-2.8v3.45a1.377 1.377 0 0 0 .325.974 1.106 1.106 0 0 0 .85.35 2.208 2.208 0 0 0 1.275-.375zM310.787 108.333a7.016 7.016 0 0 1-2.838-2.525 7.06 7.06 0 0 1 0-7.325 6.935 6.935 0 0 1 2.838-2.513 9.79 9.79 0 0 1 8.2 0 6.857 6.857 0 0 1 2.825 2.513 7.135 7.135 0 0 1 0 7.325 6.937 6.937 0 0 1-2.825 2.525 9.667 9.667 0 0 1-8.2 0zm5.687-4.2a2.918 2.918 0 0 0 .625-1.988 2.869 2.869 0 0 0-.625-1.975 2.18 2.18 0 0 0-3.2 0 2.864 2.864 0 0 0-.625 1.975 2.913 2.913 0 0 0 .625 1.988 2.153 2.153 0 0 0 3.2 0zM334.4 95.07v5a8.594 8.594 0 0 0-1.25-.1q-2.901 0-2.9 2.95v6.075h-5.65V95.321h5.374v1.474a5.548 5.548 0 0 1 4.425-1.724zM351.6 95.32l-5.626 13.95a7.906 7.906 0 0 1-2.674 3.75 6.88 6.88 0 0 1-3.925 1.075 8.273 8.273 0 0 1-2.313-.337 5.185 5.185 0 0 1-1.838-.888l1.875-3.875a3.701 3.701 0 0 0 .963.525 2.97 2.97 0 0 0 1.037.2 1.751 1.751 0 0 0 1.4-.55l-5.75-13.85h5.8l2.826 7.325 2.875-7.324zM230.576 135.946h-6.65l-1.175 3.05h-6l7.65-17.5h5.8l7.65 17.5h-6.1zm-1.625-4.25l-1.7-4.4-1.7 4.4zM241.689 138.345a6.954 6.954 0 0 1-2.875-2.524 7.006 7.006 0 0 1 0-7.338 6.988 6.988 0 0 1 2.875-2.513 9.339 9.339 0 0 1 4.162-.9 8.108 8.108 0 0 1 4.276 1.075 5.583 5.583 0 0 1 2.45 2.975l-4.376 2.15a2.56 2.56 0 0 0-2.375-1.8 2.193 2.193 0 0 0-1.662.7 2.76 2.76 0 0 0-.663 1.975 2.797 2.797 0 0 0 .663 2 2.192 2.192 0 0 0 1.662.7 2.56 2.56 0 0 0 2.375-1.8l4.376 2.15a5.58 5.58 0 0 1-2.45 2.975 8.104 8.104 0 0 1-4.276 1.075 9.34 9.34 0 0 1-4.162-.9zM264.201 138.52a7.045 7.045 0 0 1-3.475.725 6.416 6.416 0 0 1-4.425-1.387 5.301 5.301 0 0 1-1.55-4.162v-3.5h-1.875v-4.125h1.875v-3.826h5.65v3.826h2.8v4.125h-2.8v3.45a1.377 1.377 0 0 0 .325.974 1.104 1.104 0 0 0 .85.35 2.21 2.21 0 0 0 1.275-.375zM265.988 123.408a2.737 2.737 0 0 1 0-4.125 3.628 3.628 0 0 1 2.463-.813 3.728 3.728 0 0 1 2.475.775 2.489 2.489 0 0 1 .925 2 2.755 2.755 0 0 1-.925 2.138 3.544 3.544 0 0 1-2.475.838 3.628 3.628 0 0 1-2.463-.813zm-.362 1.913h5.65v13.674h-5.65zM276.913 138.333a7.016 7.016 0 0 1-2.838-2.525 7.06 7.06 0 0 1 0-7.325 6.936 6.936 0 0 1 2.838-2.513 9.79 9.79 0 0 1 8.2 0 6.857 6.857 0 0 1 2.825 2.513 7.136 7.136 0 0 1 0 7.325 6.937 6.937 0 0 1-2.825 2.525 9.667 9.667 0 0 1-8.2 0zm5.687-4.2a2.918 2.918 0 0 0 .625-1.988 2.869 2.869 0 0 0-.625-1.975 2.18 2.18 0 0 0-3.2 0 2.864 2.864 0 0 0-.625 1.975 2.913 2.913 0 0 0 .625 1.988 2.153 2.153 0 0 0 3.2 0zM304.288 126.595a6.222 6.222 0 0 1 1.537 4.6v7.8h-5.65v-6.825q0-2.35-1.675-2.35a1.958 1.958 0 0 0-1.537.663 3.093 3.093 0 0 0-.588 2.088v6.424h-5.65v-13.674h5.375v1.35a5.21 5.21 0 0 1 1.85-1.2 6.34 6.34 0 0 1 2.275-.4 5.519 5.519 0 0 1 4.063 1.524zM208.45 164.595h-1.6v4.4h-5.9v-17.5h8.426a10.335 10.335 0 0 1 4.225.8 6.468 6.468 0 0 1 2.9 9.075 6.006 6.006 0 0 1-2.45 2.225l3.675 5.4h-6.3zm2.35-8.012a2.627 2.627 0 0 0-1.8-.538h-2.15v4.1H209a2.622 2.622 0 0 0 1.8-.537 2.206 2.206 0 0 0 0-3.025zM233.876 163.47h-9.5a2.3 2.3 0 0 0 1 1.188 3.4 3.4 0 0 0 1.75.413 4.418 4.418 0 0 0 1.512-.226 5.314 5.314 0 0 0 1.338-.774l2.95 2.974q-2 2.2-5.975 2.2a9.818 9.818 0 0 1-4.35-.912 6.904 6.904 0 0 1-2.9-2.538 7.07 7.07 0 0 1-.013-7.312 6.922 6.922 0 0 1 2.775-2.513 9.142 9.142 0 0 1 7.75-.075 6.508 6.508 0 0 1 2.725 2.426 7.005 7.005 0 0 1 1.013 3.824q0 .126-.075 1.325zm-8.85-4.075a2.252 2.252 0 0 0-.75 1.35h4.4a2.297 2.297 0 0 0-.75-1.337 2.163 2.163 0 0 0-1.45-.488 2.201 2.201 0 0 0-1.45.475zM237.625 168.87a9.892 9.892 0 0 1-2.75-.975l1.55-3.725a8.112 8.112 0 0 0 2.25.9 10.383 10.383 0 0 0 2.525.325 3.92 3.92 0 0 0 1.363-.162.526.526 0 0 0 .388-.488q0-.324-.488-.45a13.272 13.272 0 0 0-1.588-.25 20.827 20.827 0 0 1-2.85-.512 4.475 4.475 0 0 1-2.062-1.212 3.513 3.513 0 0 1-.887-2.576 3.816 3.816 0 0 1 .8-2.375 5.386 5.386 0 0 1 2.387-1.674 10.41 10.41 0 0 1 3.813-.625 15.998 15.998 0 0 1 3.037.287 9.258 9.258 0 0 1 2.537.838l-1.55 3.724a8.005 8.005 0 0 0-3.95-1q-1.85 0-1.85.65c0 .217.167.372.5.463a11.49 11.49 0 0 0 1.575.262 19.19 19.19 0 0 1 2.838.526 4.575 4.575 0 0 1 2.05 1.224 3.516 3.516 0 0 1 .887 2.575 3.748 3.748 0 0 1-.8 2.326 5.39 5.39 0 0 1-2.4 1.674 10.675 10.675 0 0 1-3.874.625 15.968 15.968 0 0 1-3.45-.375zM264.326 163.47h-9.5a2.297 2.297 0 0 0 1 1.188 3.398 3.398 0 0 0 1.75.413 4.417 4.417 0 0 0 1.512-.226 5.306 5.306 0 0 0 1.338-.774l2.95 2.974q-2.001 2.2-5.976 2.2a9.82 9.82 0 0 1-4.35-.912 6.904 6.904 0 0 1-2.9-2.538 7.069 7.069 0 0 1-.011-7.312 6.921 6.921 0 0 1 2.774-2.513 9.142 9.142 0 0 1 7.75-.075 6.512 6.512 0 0 1 2.726 2.426 7.005 7.005 0 0 1 1.011 3.824q0 .126-.074 1.325zm-8.85-4.075a2.252 2.252 0 0 0-.75 1.35h4.4a2.302 2.302 0 0 0-.75-1.337 2.165 2.165 0 0 0-1.45-.488 2.202 2.202 0 0 0-1.45.475zM277.426 156.683a6.151 6.151 0 0 1 1.899 4.962v7.35h-5.25v-1.8q-.974 2.05-3.875 2.05a6.18 6.18 0 0 1-2.762-.562 3.959 3.959 0 0 1-2.312-3.688 3.477 3.477 0 0 1 1.55-3.075 8.46 8.46 0 0 1 4.7-1.05h2.274q-.275-1.6-2.575-1.6a6.463 6.463 0 0 0-1.875.288 5.279 5.279 0 0 0-1.625.787l-1.8-3.725a9.95 9.95 0 0 1 2.838-1.137 13.713 13.713 0 0 1 3.313-.412 8.281 8.281 0 0 1 5.5 1.612zm-4.45 8.837a1.881 1.881 0 0 0 .7-.975v-.95h-1.4q-1.725 0-1.725 1.15a.994.994 0 0 0 .362.788 1.46 1.46 0 0 0 .987.312 1.858 1.858 0 0 0 1.075-.325zM291.575 155.07v5a8.594 8.594 0 0 0-1.25-.1q-2.9 0-2.9 2.95v6.075h-5.65v-13.674h5.375v1.474a5.548 5.548 0 0 1 4.425-1.724zM296.238 168.345a6.951 6.951 0 0 1-2.875-2.524 7.003 7.003 0 0 1 0-7.338 6.985 6.985 0 0 1 2.875-2.513 9.337 9.337 0 0 1 4.162-.9 8.106 8.106 0 0 1 4.276 1.075 5.583 5.583 0 0 1 2.45 2.975l-4.375 2.15a2.56 2.56 0 0 0-2.375-1.8 2.194 2.194 0 0 0-1.663.7 2.762 2.762 0 0 0-.662 1.975 2.799 2.799 0 0 0 .662 2 2.193 2.193 0 0 0 1.663.7 2.56 2.56 0 0 0 2.375-1.8l4.375 2.15a5.58 5.58 0 0 1-2.45 2.975 8.101 8.101 0 0 1-4.276 1.075 9.337 9.337 0 0 1-4.162-.9zM321.988 156.595a6.222 6.222 0 0 1 1.537 4.6v7.8h-5.65v-6.825q0-2.35-1.675-2.35a1.958 1.958 0 0 0-1.537.663 3.093 3.093 0 0 0-.588 2.088v6.424h-5.65v-18.55h5.65v5.975a5.716 5.716 0 0 1 3.85-1.35 5.519 5.519 0 0 1 4.063 1.525z" />
            </g>
          </g>
          <g id="lxd" style={{ cursor: "pointer" }} onMouseDown={this.onMouseDown}>
            <circle cx={130.369} cy={351.344} r={121} fill="#f89926" />
            <circle ref={this.svgRefs.lxd.circle} cx={130.369} cy={351.344} r={102} fill="#fff" />
            <g ref={this.svgRefs.lxd.text} id="text-2" data-name="text" fill="#f89926">
              <path d="M71.781 311.093h5.9v12.925h7.9v4.575h-13.8zM101.507 323.068h-9.5a2.297 2.297 0 0 0 1 1.188 3.395 3.395 0 0 0 1.75.413 4.405 4.405 0 0 0 1.512-.226 5.31 5.31 0 0 0 1.338-.774l2.95 2.974q-2 2.2-5.976 2.2a9.812 9.812 0 0 1-4.35-.913 6.9 6.9 0 0 1-2.9-2.537 7.07 7.07 0 0 1-.012-7.312 6.924 6.924 0 0 1 2.775-2.513 9.147 9.147 0 0 1 7.75-.075 6.513 6.513 0 0 1 2.725 2.426 7.004 7.004 0 0 1 1.012 3.824q0 .126-.074 1.325zm-8.85-4.075a2.255 2.255 0 0 0-.75 1.35h4.4a2.3 2.3 0 0 0-.75-1.338 2.163 2.163 0 0 0-1.45-.487 2.201 2.201 0 0 0-1.45.475zM114.606 316.28a6.151 6.151 0 0 1 1.9 4.963v7.35h-5.25v-1.8q-.975 2.05-3.875 2.05a6.18 6.18 0 0 1-2.762-.562 3.962 3.962 0 0 1-2.313-3.688 3.477 3.477 0 0 1 1.55-3.075 8.458 8.458 0 0 1 4.7-1.05h2.275q-.275-1.6-2.575-1.6a6.459 6.459 0 0 0-1.875.288 5.273 5.273 0 0 0-1.625.787l-1.8-3.725a9.947 9.947 0 0 1 2.838-1.137 13.692 13.692 0 0 1 3.312-.412 8.28 8.28 0 0 1 5.5 1.612zm-4.45 8.838a1.875 1.875 0 0 0 .7-.975v-.95h-1.4q-1.725 0-1.725 1.15a.994.994 0 0 0 .362.788 1.459 1.459 0 0 0 .988.312 1.857 1.857 0 0 0 1.075-.325zM128.756 314.669v5a8.608 8.608 0 0 0-1.25-.101q-2.9 0-2.9 2.95v6.075h-5.65V314.92h5.375v1.474a5.546 5.546 0 0 1 4.425-1.724zM143.919 316.193a6.22 6.22 0 0 1 1.537 4.6v7.8h-5.65v-6.825q0-2.35-1.675-2.35a1.958 1.958 0 0 0-1.538.663 3.093 3.093 0 0 0-.587 2.088v6.424h-5.65V314.92h5.375v1.35a5.213 5.213 0 0 1 1.85-1.201 6.337 6.337 0 0 1 2.275-.4 5.517 5.517 0 0 1 4.063 1.525zM148.268 313.006a2.737 2.737 0 0 1 0-4.125 3.63 3.63 0 0 1 2.463-.813 3.73 3.73 0 0 1 2.475.775 2.49 2.49 0 0 1 .925 2 2.757 2.757 0 0 1-.925 2.138 3.545 3.545 0 0 1-2.475.837 3.625 3.625 0 0 1-2.463-.812zm-.362 1.913h5.65v13.674h-5.65zM169.618 316.193a6.22 6.22 0 0 1 1.538 4.6v7.8h-5.65v-6.825q0-2.35-1.675-2.35a1.958 1.958 0 0 0-1.538.663 3.092 3.092 0 0 0-.587 2.088v6.424h-5.65V314.92h5.375v1.35a5.213 5.213 0 0 1 1.85-1.201 6.337 6.337 0 0 1 2.275-.4 5.517 5.517 0 0 1 4.062 1.525zM189.13 314.919v10.949q0 3.9-2.163 5.863a8.858 8.858 0 0 1-6.162 1.962 15.932 15.932 0 0 1-3.825-.437 9.625 9.625 0 0 1-3.025-1.263l1.9-3.85a6.533 6.533 0 0 0 2.025.975 8.021 8.021 0 0 0 2.35.375 3.543 3.543 0 0 0 2.475-.725 2.772 2.772 0 0 0 .775-2.125v-.25a4.76 4.76 0 0 1-3.775 1.45 6.784 6.784 0 0 1-3.262-.812 6.158 6.158 0 0 1-2.413-2.325 6.642 6.642 0 0 1-.9-3.463 6.576 6.576 0 0 1 .9-3.45 6.18 6.18 0 0 1 2.413-2.312 6.784 6.784 0 0 1 3.262-.812 4.58 4.58 0 0 1 4.05 1.8v-1.55zm-6.262 7.912a2.064 2.064 0 0 0 .662-1.588 2.023 2.023 0 0 0-.662-1.574 2.383 2.383 0 0 0-1.663-.601 2.416 2.416 0 0 0-1.687.6 2.022 2.022 0 0 0-.663 1.575 2.046 2.046 0 0 0 .675 1.588 2.4 2.4 0 0 0 1.675.612 2.356 2.356 0 0 0 1.663-.612zM70.332 354.143v4.45h-14.55v-17.5h14.225v4.45h-8.425v2.05h7.4v4.25h-7.4v2.3zM81.056 358.593l-1.875-2.924-2.1 2.924h-6.125l5.176-6.775-5.026-6.9h6.375l1.95 2.9 2.05-2.9h5.925l-5.024 6.65 5.15 7.025zM100.993 345.53a6.225 6.225 0 0 1 2.4 2.488 7.706 7.706 0 0 1 .888 3.75 7.63 7.63 0 0 1-.888 3.738 6.244 6.244 0 0 1-2.4 2.475 6.58 6.58 0 0 1-3.312.862 4.767 4.767 0 0 1-3.475-1.174v5.774h-5.65v-18.524h5.375v1.125a4.767 4.767 0 0 1 3.75-1.375 6.57 6.57 0 0 1 3.312.862zm-3.062 8.213a2.864 2.864 0 0 0 .625-1.975 2.915 2.915 0 0 0-.625-1.987 2.152 2.152 0 0 0-3.2 0 2.915 2.915 0 0 0-.625 1.987 2.864 2.864 0 0 0 .625 1.975 2.178 2.178 0 0 0 3.2 0zM120.531 353.068h-9.5a2.297 2.297 0 0 0 1 1.188 3.395 3.395 0 0 0 1.75.413 4.405 4.405 0 0 0 1.512-.226 5.31 5.31 0 0 0 1.338-.774l2.95 2.974q-2 2.2-5.975 2.2a9.812 9.812 0 0 1-4.35-.913 6.9 6.9 0 0 1-2.9-2.537 7.07 7.07 0 0 1-.012-7.312 6.924 6.924 0 0 1 2.774-2.513 9.147 9.147 0 0 1 7.75-.075 6.513 6.513 0 0 1 2.726 2.426 7.005 7.005 0 0 1 1.012 3.824q0 .126-.075 1.325zm-8.85-4.075a2.255 2.255 0 0 0-.75 1.35h4.4a2.3 2.3 0 0 0-.75-1.338 2.163 2.163 0 0 0-1.45-.487 2.201 2.201 0 0 0-1.45.475zM132.18 344.669v5a8.608 8.608 0 0 0-1.25-.101q-2.9 0-2.899 2.95v6.075h-5.65V344.92h5.375v1.474a5.546 5.546 0 0 1 4.425-1.724zM134.143 343.006a2.737 2.737 0 0 1 0-4.125 3.63 3.63 0 0 1 2.463-.813 3.73 3.73 0 0 1 2.475.775 2.49 2.49 0 0 1 .925 2 2.757 2.757 0 0 1-.925 2.138 3.545 3.545 0 0 1-2.475.837 3.625 3.625 0 0 1-2.463-.812zm-.362 1.913h5.65v13.674h-5.65zM156.405 353.068h-9.5a2.297 2.297 0 0 0 1 1.188 3.395 3.395 0 0 0 1.75.413 4.405 4.405 0 0 0 1.513-.226 5.31 5.31 0 0 0 1.338-.774l2.95 2.974q-2.001 2.2-5.976 2.2a9.812 9.812 0 0 1-4.35-.913 6.9 6.9 0 0 1-2.9-2.537 7.07 7.07 0 0 1-.012-7.312 6.924 6.924 0 0 1 2.775-2.513 9.147 9.147 0 0 1 7.75-.075 6.513 6.513 0 0 1 2.725 2.426 7.004 7.004 0 0 1 1.012 3.824q0 .126-.075 1.325zm-8.85-4.075a2.255 2.255 0 0 0-.75 1.35h4.4a2.3 2.3 0 0 0-.75-1.338 2.163 2.163 0 0 0-1.45-.487 2.201 2.201 0 0 0-1.45.475zM171.818 346.193a6.22 6.22 0 0 1 1.538 4.6v7.8h-5.65v-6.825q0-2.35-1.676-2.35a1.958 1.958 0 0 0-1.537.663 3.093 3.093 0 0 0-.588 2.088v6.424h-5.65V344.92h5.376v1.35a5.213 5.213 0 0 1 1.85-1.201 6.337 6.337 0 0 1 2.275-.4 5.517 5.517 0 0 1 4.062 1.525zM179.243 357.943a6.953 6.953 0 0 1-2.875-2.524 7.006 7.006 0 0 1 0-7.338 6.99 6.99 0 0 1 2.875-2.513 9.346 9.346 0 0 1 4.162-.9 8.11 8.11 0 0 1 4.275 1.075 5.582 5.582 0 0 1 2.45 2.975l-4.374 2.15a2.561 2.561 0 0 0-2.375-1.8 2.192 2.192 0 0 0-1.663.7 2.76 2.76 0 0 0-.663 1.975 2.795 2.795 0 0 0 .663 2 2.192 2.192 0 0 0 1.663.7 2.56 2.56 0 0 0 2.375-1.8l4.375 2.15a5.58 5.58 0 0 1-2.45 2.975 8.1 8.1 0 0 1-4.276 1.075 9.333 9.333 0 0 1-4.162-.9zM205.78 353.068h-9.5a2.297 2.297 0 0 0 1 1.188 3.395 3.395 0 0 0 1.75.413 4.405 4.405 0 0 0 1.513-.226 5.31 5.31 0 0 0 1.338-.774l2.95 2.974q-2.001 2.2-5.976 2.2a9.812 9.812 0 0 1-4.35-.913 6.9 6.9 0 0 1-2.9-2.537 7.07 7.07 0 0 1-.012-7.312 6.924 6.924 0 0 1 2.775-2.513 9.147 9.147 0 0 1 7.75-.075 6.513 6.513 0 0 1 2.725 2.426 7.004 7.004 0 0 1 1.012 3.824q0 .126-.075 1.325zm-8.85-4.075a2.255 2.255 0 0 0-.75 1.35h4.4a2.3 2.3 0 0 0-.75-1.338 2.163 2.163 0 0 0-1.45-.487 2.201 2.201 0 0 0-1.45.475zM84.506 371.093h8.625a11.909 11.909 0 0 1 5.163 1.063 8.084 8.084 0 0 1 3.475 3.037 9.356 9.356 0 0 1 0 9.3 8.08 8.08 0 0 1-3.475 3.038 11.909 11.909 0 0 1-5.163 1.062h-8.625zm8.375 12.9a4.214 4.214 0 0 0 3.038-1.087 4.69 4.69 0 0 0 0-6.125 4.21 4.21 0 0 0-3.038-1.088h-2.475v8.3zM119.456 383.068h-9.5a2.297 2.297 0 0 0 1 1.188 3.395 3.395 0 0 0 1.75.413 4.405 4.405 0 0 0 1.512-.226 5.31 5.31 0 0 0 1.338-.774l2.95 2.974q-2 2.2-5.975 2.2a9.812 9.812 0 0 1-4.35-.913 6.9 6.9 0 0 1-2.9-2.537 7.07 7.07 0 0 1-.012-7.312 6.924 6.924 0 0 1 2.775-2.513 9.147 9.147 0 0 1 7.75-.075 6.513 6.513 0 0 1 2.725 2.426 7.004 7.004 0 0 1 1.012 3.824q0 .126-.075 1.325zm-8.85-4.075a2.255 2.255 0 0 0-.75 1.35h4.4a2.3 2.3 0 0 0-.75-1.338 2.163 2.163 0 0 0-1.45-.487 2.201 2.201 0 0 0-1.45.475zM123.206 388.468a9.876 9.876 0 0 1-2.75-.975l1.55-3.725a8.113 8.113 0 0 0 2.25.9 10.381 10.381 0 0 0 2.525.325 3.935 3.935 0 0 0 1.362-.162.527.527 0 0 0 .388-.488c0-.216-.163-.366-.488-.45a13.27 13.27 0 0 0-1.587-.25 20.744 20.744 0 0 1-2.85-.512 4.47 4.47 0 0 1-2.063-1.212 3.515 3.515 0 0 1-.887-2.576 3.815 3.815 0 0 1 .8-2.375 5.382 5.382 0 0 1 2.387-1.674 10.4 10.4 0 0 1 3.813-.625 15.997 15.997 0 0 1 3.038.287 9.225 9.225 0 0 1 2.537.838l-1.55 3.724a8.004 8.004 0 0 0-3.95-1q-1.85 0-1.85.65c0 .217.166.372.5.463a11.472 11.472 0 0 0 1.575.262 19.188 19.188 0 0 1 2.837.526 4.575 4.575 0 0 1 2.05 1.224 3.516 3.516 0 0 1 .888 2.575 3.75 3.75 0 0 1-.8 2.326 5.398 5.398 0 0 1-2.4 1.674 10.685 10.685 0 0 1-3.875.625 15.968 15.968 0 0 1-3.45-.375zM135.793 373.006a2.737 2.737 0 0 1 0-4.125 3.63 3.63 0 0 1 2.463-.813 3.73 3.73 0 0 1 2.475.775 2.49 2.49 0 0 1 .925 2 2.757 2.757 0 0 1-.925 2.138 3.545 3.545 0 0 1-2.475.837 3.625 3.625 0 0 1-2.463-.812zm-.362 1.913h5.65v13.674h-5.65zM158.855 374.919v10.949q0 3.9-2.162 5.863a8.858 8.858 0 0 1-6.163 1.962 15.931 15.931 0 0 1-3.825-.437 9.625 9.625 0 0 1-3.025-1.263l1.9-3.85a6.533 6.533 0 0 0 2.025.975 8.021 8.021 0 0 0 2.35.375 3.543 3.543 0 0 0 2.475-.725 2.772 2.772 0 0 0 .775-2.125v-.25a4.76 4.76 0 0 1-3.775 1.45 6.784 6.784 0 0 1-3.262-.812 6.158 6.158 0 0 1-2.413-2.325 6.642 6.642 0 0 1-.9-3.463 6.576 6.576 0 0 1 .9-3.45 6.18 6.18 0 0 1 2.413-2.312 6.784 6.784 0 0 1 3.262-.812 4.58 4.58 0 0 1 4.05 1.8v-1.55zm-6.262 7.912a2.064 2.064 0 0 0 .662-1.588 2.023 2.023 0 0 0-.662-1.574 2.383 2.383 0 0 0-1.663-.601 2.416 2.416 0 0 0-1.687.6 2.022 2.022 0 0 0-.663 1.575 2.046 2.046 0 0 0 .675 1.588 2.4 2.4 0 0 0 1.675.612 2.356 2.356 0 0 0 1.663-.612zM174.918 376.193a6.22 6.22 0 0 1 1.537 4.6v7.8h-5.65v-6.825q0-2.35-1.675-2.35a1.958 1.958 0 0 0-1.538.663 3.093 3.093 0 0 0-.587 2.088v6.424h-5.65V374.92h5.375v1.35a5.213 5.213 0 0 1 1.85-1.201 6.337 6.337 0 0 1 2.275-.4 5.517 5.517 0 0 1 4.063 1.525z" />
            </g>
          </g>
          <g id="pd" style={{ cursor: "pointer" }} onMouseDown={this.onMouseDown}>
            <circle cx={395.682} cy={351.344} r={121} fill="#b3519f" />
            <circle ref={this.svgRefs.pd.circle} cx={395.682} cy={351.344} r={102} fill="#fff" />
            <g ref={this.svgRefs.pd.text} id="text-3" data-name="text" fill="#b3519f">
              <path d="M325.421 326.894a6.303 6.303 0 0 1 0 11.6 10.32 10.32 0 0 1-4.225.8h-2.525v4.3h-5.9v-17.5h8.425a10.337 10.337 0 0 1 4.225.8zm-2.8 7.313a2.205 2.205 0 0 0 0-3.026 2.628 2.628 0 0 0-1.8-.537h-2.15v4.1h2.15a2.624 2.624 0 0 0 1.8-.537zM340.97 329.67v5a8.597 8.597 0 0 0-1.25-.101q-2.9 0-2.9 2.95v6.075h-5.65V329.92h5.375v1.474a5.547 5.547 0 0 1 4.425-1.724zM345.583 342.931a7.012 7.012 0 0 1-2.838-2.524 7.06 7.06 0 0 1 0-7.325 6.937 6.937 0 0 1 2.838-2.513 9.795 9.795 0 0 1 8.2 0 6.858 6.858 0 0 1 2.826 2.513 7.136 7.136 0 0 1 0 7.325 6.932 6.932 0 0 1-2.826 2.524 9.662 9.662 0 0 1-8.2 0zm5.688-4.199a2.92 2.92 0 0 0 .625-1.988 2.868 2.868 0 0 0-.625-1.975 2.178 2.178 0 0 0-3.2 0 2.864 2.864 0 0 0-.625 1.975 2.915 2.915 0 0 0 .625 1.988 2.154 2.154 0 0 0 3.2 0zM365.495 330.67h2.976v4.125h-2.8v8.8h-5.65v-8.8h-1.875v-4.125h1.875v-.076a5.65 5.65 0 0 1 1.6-4.237 6.168 6.168 0 0 1 4.5-1.562 9.715 9.715 0 0 1 1.85.174 5.261 5.261 0 0 1 1.5.5l-1.35 3.925a3.064 3.064 0 0 0-1.275-.325 1.29 1.29 0 0 0-.988.388 1.69 1.69 0 0 0-.363 1.187zM384.396 338.069h-9.5a2.3 2.3 0 0 0 1 1.188 3.396 3.396 0 0 0 1.75.413 4.406 4.406 0 0 0 1.512-.226 5.32 5.32 0 0 0 1.338-.774l2.95 2.974q-2 2.2-5.975 2.2a9.81 9.81 0 0 1-4.35-.913 6.9 6.9 0 0 1-2.9-2.537 7.069 7.069 0 0 1-.013-7.312 6.925 6.925 0 0 1 2.776-2.513 9.147 9.147 0 0 1 7.75-.075 6.508 6.508 0 0 1 2.724 2.426 7.005 7.005 0 0 1 1.013 3.824q0 .126-.075 1.325zm-8.85-4.075a2.255 2.255 0 0 0-.75 1.35h4.4a2.295 2.295 0 0 0-.75-1.338 2.16 2.16 0 0 0-1.45-.487 2.2 2.2 0 0 0-1.45.475zM388.146 343.47a9.87 9.87 0 0 1-2.75-.976l1.55-3.725a8.113 8.113 0 0 0 2.25.9 10.383 10.383 0 0 0 2.525.325 3.94 3.94 0 0 0 1.362-.162.527.527 0 0 0 .388-.488c0-.216-.163-.366-.488-.45a13.24 13.24 0 0 0-1.587-.25 20.74 20.74 0 0 1-2.85-.513 4.47 4.47 0 0 1-2.063-1.211 3.515 3.515 0 0 1-.887-2.576 3.812 3.812 0 0 1 .8-2.375 5.382 5.382 0 0 1 2.387-1.674 10.396 10.396 0 0 1 3.813-.625 15.992 15.992 0 0 1 3.037.287 9.22 9.22 0 0 1 2.537.838l-1.55 3.724a8.004 8.004 0 0 0-3.95-1q-1.85 0-1.85.65c0 .217.167.372.5.462a11.482 11.482 0 0 0 1.576.263 19.18 19.18 0 0 1 2.837.526 4.577 4.577 0 0 1 2.05 1.224 3.517 3.517 0 0 1 .887 2.575 3.75 3.75 0 0 1-.8 2.326 5.394 5.394 0 0 1-2.4 1.674 10.689 10.689 0 0 1-3.874.625 15.965 15.965 0 0 1-3.45-.375zM402.27 343.47a9.881 9.881 0 0 1-2.75-.976l1.55-3.725a8.113 8.113 0 0 0 2.25.9 10.381 10.381 0 0 0 2.525.325 3.932 3.932 0 0 0 1.362-.162.526.526 0 0 0 .388-.488c0-.216-.162-.366-.487-.45a13.3 13.3 0 0 0-1.588-.25 20.751 20.751 0 0 1-2.85-.513 4.47 4.47 0 0 1-2.062-1.211 3.515 3.515 0 0 1-.888-2.576 3.818 3.818 0 0 1 .8-2.375 5.382 5.382 0 0 1 2.387-1.674 10.403 10.403 0 0 1 3.813-.625 16.002 16.002 0 0 1 3.038.287 9.23 9.23 0 0 1 2.537.838l-1.55 3.724a8.004 8.004 0 0 0-3.95-1q-1.85 0-1.85.65c0 .217.167.372.5.462a11.462 11.462 0 0 0 1.575.263 19.196 19.196 0 0 1 2.838.526 4.574 4.574 0 0 1 2.05 1.224 3.514 3.514 0 0 1 .887 2.575 3.75 3.75 0 0 1-.8 2.326 5.403 5.403 0 0 1-2.4 1.674 10.681 10.681 0 0 1-3.875.625 15.971 15.971 0 0 1-3.45-.375zM414.858 328.006a2.737 2.737 0 0 1 0-4.125 3.629 3.629 0 0 1 2.463-.812 3.73 3.73 0 0 1 2.474.775 2.49 2.49 0 0 1 .925 2 2.758 2.758 0 0 1-.925 2.138 3.546 3.546 0 0 1-2.474.837 3.624 3.624 0 0 1-2.463-.813zm-.363 1.914h5.65v13.674h-5.65zM425.782 342.931a7.012 7.012 0 0 1-2.837-2.524 7.054 7.054 0 0 1 0-7.325 6.937 6.937 0 0 1 2.837-2.513 9.793 9.793 0 0 1 8.2 0 6.846 6.846 0 0 1 2.825 2.513 7.13 7.13 0 0 1 0 7.325 6.92 6.92 0 0 1-2.825 2.524 9.66 9.66 0 0 1-8.2 0zm5.688-4.199a2.92 2.92 0 0 0 .625-1.988 2.868 2.868 0 0 0-.625-1.975 2.178 2.178 0 0 0-3.2 0 2.864 2.864 0 0 0-.625 1.975 2.915 2.915 0 0 0 .625 1.988 2.154 2.154 0 0 0 3.2 0zM453.157 331.194a6.222 6.222 0 0 1 1.538 4.6v7.8h-5.65v-6.825q0-2.35-1.676-2.35a1.957 1.957 0 0 0-1.537.663 3.092 3.092 0 0 0-.588 2.088v6.424h-5.65V329.92h5.376v1.35a5.21 5.21 0 0 1 1.85-1.201 6.34 6.34 0 0 1 2.275-.4 5.518 5.518 0 0 1 4.062 1.525zM468.77 331.282a6.151 6.151 0 0 1 1.9 4.962v7.35h-5.25v-1.8q-.975 2.05-3.876 2.05a6.18 6.18 0 0 1-2.762-.562 3.96 3.96 0 0 1-2.312-3.688 3.476 3.476 0 0 1 1.55-3.075 8.457 8.457 0 0 1 4.7-1.05h2.274q-.275-1.6-2.575-1.6a6.464 6.464 0 0 0-1.875.288 5.278 5.278 0 0 0-1.625.787l-1.8-3.725a9.95 9.95 0 0 1 2.838-1.137 13.689 13.689 0 0 1 3.313-.412 8.281 8.281 0 0 1 5.5 1.612zm-4.45 8.837a1.878 1.878 0 0 0 .7-.975v-.95h-1.4q-1.725 0-1.725 1.15a.993.993 0 0 0 .362.787 1.457 1.457 0 0 0 .987.313 1.858 1.858 0 0 0 1.076-.325zM473.12 325.045h5.649v18.55h-5.65zM305.608 356.094h8.625a11.905 11.905 0 0 1 5.162 1.063 8.083 8.083 0 0 1 3.475 3.037 9.356 9.356 0 0 1 0 9.3 8.078 8.078 0 0 1-3.475 3.038 11.905 11.905 0 0 1-5.162 1.062h-8.625zm8.375 12.9a4.212 4.212 0 0 0 3.037-1.087 4.69 4.69 0 0 0 0-6.125 4.208 4.208 0 0 0-3.037-1.088h-2.475v8.3zM340.558 368.069h-9.5a2.295 2.295 0 0 0 1 1.188 3.393 3.393 0 0 0 1.75.413 4.404 4.404 0 0 0 1.512-.226 5.302 5.302 0 0 0 1.337-.774l2.95 2.974q-2 2.2-5.975 2.2a9.813 9.813 0 0 1-4.35-.913 6.9 6.9 0 0 1-2.9-2.537 7.072 7.072 0 0 1-.012-7.312 6.922 6.922 0 0 1 2.775-2.513 9.147 9.147 0 0 1 7.75-.075 6.517 6.517 0 0 1 2.725 2.426 7.004 7.004 0 0 1 1.012 3.824q0 .126-.074 1.325zm-8.85-4.075a2.255 2.255 0 0 0-.75 1.35h4.4a2.305 2.305 0 0 0-.75-1.338 2.165 2.165 0 0 0-1.45-.487 2.202 2.202 0 0 0-1.45.475zM357.382 359.92l-5.5 13.674h-5.85l-5.5-13.674h5.8l2.75 7.324 2.95-7.324zM372.358 368.069h-9.5a2.295 2.295 0 0 0 1 1.188 3.393 3.393 0 0 0 1.75.413 4.404 4.404 0 0 0 1.511-.226 5.303 5.303 0 0 0 1.338-.774l2.95 2.974q-2 2.2-5.975 2.2a9.813 9.813 0 0 1-4.35-.913 6.9 6.9 0 0 1-2.9-2.537 7.072 7.072 0 0 1-.012-7.312 6.922 6.922 0 0 1 2.775-2.513 9.147 9.147 0 0 1 7.75-.075 6.517 6.517 0 0 1 2.725 2.426 7.004 7.004 0 0 1 1.012 3.824q0 .126-.074 1.325zm-8.851-4.075a2.255 2.255 0 0 0-.75 1.35h4.4a2.305 2.305 0 0 0-.75-1.338 2.165 2.165 0 0 0-1.45-.487 2.202 2.202 0 0 0-1.45.475zM374.207 355.045h5.65v18.55h-5.65zM385.494 372.931a7.012 7.012 0 0 1-2.838-2.524 7.06 7.06 0 0 1 0-7.325 6.937 6.937 0 0 1 2.838-2.513 9.795 9.795 0 0 1 8.2 0 6.858 6.858 0 0 1 2.826 2.513 7.135 7.135 0 0 1 0 7.325 6.932 6.932 0 0 1-2.825 2.524 9.662 9.662 0 0 1-8.2 0zm5.688-4.199a2.92 2.92 0 0 0 .625-1.988 2.868 2.868 0 0 0-.625-1.975 2.178 2.178 0 0 0-3.2 0 2.864 2.864 0 0 0-.625 1.975 2.915 2.915 0 0 0 .625 1.988 2.154 2.154 0 0 0 3.2 0zM411.744 360.532a6.223 6.223 0 0 1 2.4 2.487 7.711 7.711 0 0 1 .888 3.75 7.635 7.635 0 0 1-.887 3.737 6.242 6.242 0 0 1-2.4 2.476 6.58 6.58 0 0 1-3.313.862 4.765 4.765 0 0 1-3.475-1.174v5.774h-5.65V359.92h5.375v1.125a4.767 4.767 0 0 1 3.75-1.375 6.57 6.57 0 0 1 3.312.862zm-3.062 8.212a2.862 2.862 0 0 0 .625-1.975 2.912 2.912 0 0 0-.625-1.987 2.152 2.152 0 0 0-3.2 0 2.917 2.917 0 0 0-.625 1.987 2.867 2.867 0 0 0 .625 1.975 2.178 2.178 0 0 0 3.2 0zM438.87 361.194a6.351 6.351 0 0 1 1.487 4.6v7.8h-5.65v-6.825q0-2.35-1.525-2.35a1.575 1.575 0 0 0-1.287.6 3.001 3.001 0 0 0-.488 1.9v6.675h-5.65v-6.825q0-2.35-1.525-2.35a1.575 1.575 0 0 0-1.288.6 3.001 3.001 0 0 0-.487 1.9v6.675h-5.65V359.92h5.375v1.274a5.25 5.25 0 0 1 3.875-1.524 5.81 5.81 0 0 1 2.475.511 4.347 4.347 0 0 1 1.8 1.563 5.557 5.557 0 0 1 2-1.537 6.114 6.114 0 0 1 2.575-.537 5.282 5.282 0 0 1 3.962 1.524zM457.531 368.069h-9.5a2.3 2.3 0 0 0 1 1.188 3.396 3.396 0 0 0 1.75.413 4.406 4.406 0 0 0 1.513-.226 5.319 5.319 0 0 0 1.338-.774l2.95 2.974q-2 2.2-5.975 2.2a9.81 9.81 0 0 1-4.35-.913 6.9 6.9 0 0 1-2.9-2.537 7.069 7.069 0 0 1-.013-7.312 6.925 6.925 0 0 1 2.775-2.513 9.147 9.147 0 0 1 7.75-.075 6.508 6.508 0 0 1 2.725 2.426 7.005 7.005 0 0 1 1.013 3.824q0 .126-.076 1.325zm-8.85-4.075a2.255 2.255 0 0 0-.75 1.35h4.4a2.295 2.295 0 0 0-.75-1.338 2.16 2.16 0 0 0-1.449-.487 2.2 2.2 0 0 0-1.45.475zM472.945 361.194a6.222 6.222 0 0 1 1.537 4.6v7.8h-5.65v-6.825q0-2.35-1.676-2.35a1.957 1.957 0 0 0-1.537.663 3.092 3.092 0 0 0-.588 2.088v6.424h-5.649V359.92h5.375v1.35a5.21 5.21 0 0 1 1.85-1.201 6.34 6.34 0 0 1 2.275-.4 5.518 5.518 0 0 1 4.063 1.525zM487.007 373.119a7.049 7.049 0 0 1-3.476.725 6.416 6.416 0 0 1-4.424-1.387 5.301 5.301 0 0 1-1.55-4.162v-3.5h-1.875v-4.125h1.875v-3.826h5.65v3.826h2.8v4.125h-2.8v3.449a1.379 1.379 0 0 0 .324.975 1.106 1.106 0 0 0 .851.35 2.208 2.208 0 0 0 1.274-.375z" />
            </g>
          </g>
        </svg>
        <div className={style.projects}>{list}</div>
      </div>
    );
  }
}
