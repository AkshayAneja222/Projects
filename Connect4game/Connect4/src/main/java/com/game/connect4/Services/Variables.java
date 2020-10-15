package com.game.connect4.Services;

import java.util.HashMap;
import java.util.Map;

public abstract class Variables{
	final static int Columns=7;
	final static int Rows=6;
	final static int[] xAxis = {-1, -1, -1, 0, 0, 1, 1, 1};
	final static int[] yAxis = {-1, 0, 1, -1, 1, -1, 0, 1};
	final static int winningLength = 4;
	final static Map<String, Integer> Colors = new HashMap<String, Integer>() {
		private static final long serialVersionUID = 5497942481117350005L;
	{
		put("Red", 1);
		put("Yellow", 2);
	}};
}