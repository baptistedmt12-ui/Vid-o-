import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// Les rushes et assets vivent dans videos/ : staticFile("001-video-001/rushes/source.mp4")
Config.setPublicDir("./videos");
