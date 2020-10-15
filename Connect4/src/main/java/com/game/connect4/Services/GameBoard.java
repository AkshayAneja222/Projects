package com.game.connect4.Services;

import java.io.Serializable;

public class GameBoard extends Variables implements Serializable {

	private int[] remaining = new int[Columns];
	private int[][] gameBoard = new int[Rows][Columns];
	private int movesCount = 1;

	public GameBoard() {
		for (int i = 0; i < Columns; i++) {
			remaining[i] = Rows;
		}
	}

	public boolean bfs(int x, int y, int neigh_x, int neigh_y, int len, int color) {
		if (len == winningLength)
			return gameBoard[x][y] == color;

		if (isInsideBoard(x + neigh_x, y + neigh_y) && gameBoard[x + neigh_x][y + neigh_y] == color)
			return bfs(x + neigh_x, y + neigh_y, neigh_x, neigh_y, len + 1, color);

		return false;
	}

	public boolean isInsideBoard(int x, int y) {
		return (x >= 0 && x <= Rows - 1 && y >= 0 && y <= Columns - 1);
	}

	public boolean isValidMove(int column) {
		if (column >= 0 && column <= Columns - 1 && remaining[column] > 0)
			return true;
		return false;
	}

	public synchronized String dropCoin(int column, String color) {

		if (!isValidMove(column - 1) || !isValidPlayer(color))
			return "InValid";

		int position = remaining[column - 1];

		remaining[column - 1]--;

		gameBoard[position - 1][column - 1] = Colors.get(color);

		movesCount++;

		for (int i = 0; i < xAxis.length; i++) {
			if (bfs(position - 1, column - 1, xAxis[i], yAxis[i], 1, Colors.get(color)))
				return "Winner";
		}
		
		if(movesCount==Rows*Columns) return "Draw";
		
		return "Valid";
	}

	public boolean isValidPlayer(String player) {
		if ((movesCount % 2 == 0 && player.equals("Red")) || (movesCount % 2 != 0 && player.equals("Yellow")))
			return true;
		return false;
	}
}
