package buildTree;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import org.jsoup.*;
import org.jsoup.nodes.*;
import org.jsoup.select.Elements;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Vector;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class buildTreeForCase2 {
	public static void main(String[] args) throws Exception {
		String pathRoot = "E:/5涓婅浠�/杞欢鍒嗘瀽鎶�鏈�/澶т綔涓�/Css-tracker/";
		String cssfile = "/test/testcase/tc2/src/app/inside/view2/view2.scss";
		String css = "";
		Object obj = new buildTreeForCase2();
		((buildTreeForCase2) obj).Tracker(pathRoot, cssfile, css);
	}
	
	
	public static String workspace; 
	public static String workspace2src;
	public String Tracker(String pathRoot, String cssfile, String css) throws IOException {
		workspace = pathRoot;
		String[] filesplit = cssfile.split("/src/");
		workspace2src = filesplit[0].substring(1, filesplit[0].length()) + "/src/";
		cssfile = filesplit[1];
		//以entry.js为入口，找到controller.js
		String Controllerpath = getController(workspace + workspace2src);
		//建树
		Element doc = BuildTree(Controllerpath);
		//在树中搜索CSS
		String Result = doc2String(doc, workspace + workspace2src + cssfile, css);
		return Result;
	}

	private String doc2String(Element doc, String cssPath, String cssString) throws IOException {
		ArrayList<String> selector = findSelector(cssPath, cssString);
		StringBuilder sb = new StringBuilder();
		int selNum = 1;
		for (String item : selector) {
			String sel = item.split(":")[0];
			String type = item.split(":")[1];
			Elements eles = new Elements();
			if (type.equals("class")) {
				eles = doc.getElementsByClass(sel);
			}
			if (type.equals("tagName")) {
				eles.addAll(doc.getElementsByTag(sel));
			}
			if (type.equals("id")) {
				eles.add(doc.getElementById(sel));
			}
			
			for (Element ele : eles) {
				sb.append("Selector" + selNum + ",Type:" + type + "  Tag:" + sel + "\n");
				selNum += 1;
				Elements childs = ele.getAllElements();
				for (Element child : childs) {
					String path = child.attr("filepath").replaceAll("/[./]+", "/");
					System.out.println(path);
					System.out.println(workspace);
					path = path.replaceFirst(workspace, "");
					sb.append(path + "," + child.tagName() + "\n");
				}

				Elements fathers = ele.parents();
				for (Element father : fathers) {
					String path = father.attr("filepath").replaceAll("/[./]+", "/");
					path = path.replaceFirst(workspace, "");
					sb.append(path + "," + father.tagName() + "\n");
				}
			}
		}
		System.out.print(sb.toString());
		return sb.toString();
	}

	private ArrayList<String> findSelector(String csspath, String cssString) throws IOException {
		String scssAll = readFile(csspath);
		System.out.println(scssAll);
		Pattern bracket = Pattern.compile("^\\s*(\\S+)\\s+\\{(.*)\\}\\s*$");
		ArrayList<String> selector = new ArrayList<>();
		String css = "";
		while (true) {
			Matcher matcher = bracket.matcher(scssAll);
			if (matcher.find()) {
				selector.add(matcher.group(1));
				scssAll = matcher.group(2);
			} else {
				css = scssAll;
				break;
			}
		}
		System.out.println(css);

		if (css.contains(cssString)) {
			for (int i = 0; i < selector.size(); i++) {
				String item = selector.get(i);
				if (item.contains(".")) {
					item = item.substring(1, item.length());
					item += ":class";
				} else if (item.contains("#")) {
					item = item.substring(1, item.length());
					item += ":id";
				}
				else {
					item += ":tagName";
				}
				selector.set(i, item);
			}
		}

		System.out.println(selector);
		return selector;
	}

	private String getController(String pathRoot) throws IOException {
		Vector<String> app = findImport(pathRoot + "entry.js");
		Vector<String> controller = findImport(pathRoot + app.get(0));
		String appPath[] = app.get(0).split("/");
		System.out.println(appPath[0] + "/" + appPath[1] + "/" + controller.get(1));
		return pathRoot + appPath[0] + "/" + appPath[1] + "/" + controller.get(1);
	}

	private Vector<String> findImport(String filename) throws IOException {
		Pattern pattern = Pattern.compile("import \\w+ from '([\\w./]+)'");

		File file = new File(filename);
		BufferedReader bufferedReader = new BufferedReader(new FileReader(file));
		String content = "";
		Vector<String> vStrings = new Vector<String>();
		while (content != null) {
			content = bufferedReader.readLine();
			if (content == null) {
				break;
			}
			Matcher matcher = pattern.matcher(content);
			if (matcher.find()) {
				vStrings.add(matcher.group(1));
			}
		}
		bufferedReader.close();
		return vStrings;
	}

	private String returnPath(String path) {
		String temp[] = path.split("/");
		String path1 = "";
		for (int i = 0; i < temp.length - 1; i++)
			path1 += temp[i] + "/";
		return path1;
	}

	private Element BuildTree(String path) throws IOException {
		Vector<String> views = findImport(path);
		System.out.println(views.get(0));

		System.out.println(returnPath(path));
		Element rootDoc = shell(returnPath(path) + views.get(0));
		for (int i = 1; i < views.size(); i++) {
			System.out.println(views);
			Element view = shell(returnPath(path) + views.get(i));
			Elements region = rootDoc.getElementsByClass("region" + i);
			region.get(0).appendChild(view);
		}

		System.out.println(rootDoc);
		return rootDoc;
	}

	private Element shell(String path) throws IOException {
		Vector<String> importhbs = findImport(path);
		String hbsname = returnPath(path) + importhbs.get(0);
		System.out.println(hbsname);
		File hbsfile = new File(hbsname);
		Document hbsdoc = Jsoup.parse(hbsfile, "UTF-8", "");

		HashMap<String, String> hMap = new HashMap<>();
		BufferedReader bufferedReader = new BufferedReader(new FileReader(path));
		String content = "";
		Pattern pattern = Pattern.compile("(\\w+): '([\\w\\S]+)'");
		while (content != null) {
			content = bufferedReader.readLine();
			if (content == null) {
				break;
			}
			Matcher matcher = pattern.matcher(content);
			if (matcher.find()) {
				hMap.put(matcher.group(1), matcher.group(2));
			}
		}
		bufferedReader.close();

		Elements eles = hbsdoc.getAllElements();
		for (Element ele : eles) {
			ele.attr("filepath", hbsname);
		}

		Document newDoc = new Document("");
		Element outerDiv = newDoc.createElement(hMap.get("tagName"));
		if (hMap.containsKey("id"))
			outerDiv.attr("id", hMap.get("id"));
		if (hMap.containsKey("className"))
			outerDiv.attr("class", hMap.get("className"));
		outerDiv.attr(" ", path);
		outerDiv.append(hbsdoc.body().html());

		return outerDiv;
	}

	public static String readFile(String filename) throws IOException {
		File file = new File(filename);
		BufferedReader bufferedReader = new BufferedReader(new FileReader(file));
		String content = "";
		StringBuilder sb = new StringBuilder();
		while (content != null) {
			content = bufferedReader.readLine();
			if (content == null) {
				break;
			}
			sb.append(content);
		}
		bufferedReader.close();
		return sb.toString();
	}

}
