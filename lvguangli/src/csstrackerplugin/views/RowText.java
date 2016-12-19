package csstrackerplugin.views;

import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.IEditorPart;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.part.*;

import com.sun.scenario.effect.impl.state.PerspectiveTransformState;

import javafx.scene.shape.Path;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.viewers.IDecoration;
import org.eclipse.jface.viewers.TableViewer;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.events.MouseListener;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableColumn;
import org.eclipse.ui.ide.IDE;

public class RowText extends ViewPart {

	/**
	 * The ID of the view as specified by the extension.
	 */
	public static final String ID = "csstrackerplugin.views.RowText";

	// private TableViewer viewer;
	private Composite parent;
	private List<Label> labels;
	private TableViewer tableViewer;

	/**
	 * The constructor.
	 */
	public RowText() {
		labels = new ArrayList<Label>();
	}

	@Override
	public void createPartControl(Composite parent) {
		Composite container = new Composite(parent, SWT.NONE);
		TableViewer tableViewer = new TableViewer(container, SWT.BORDER);
		Table table = tableViewer.getTable();
		tableViewer.setContentProvider(new TableContentProvider());
		tableViewer.setLabelProvider(new TableLabelProvider());
		table.setBounds(0, 0, 500, 500);
		TableColumn pathTableColumn = new TableColumn(table, SWT.NONE);
		pathTableColumn.setWidth(300);
		pathTableColumn.setText("file path");
		TableColumn tagTableColumn = new TableColumn(table, SWT.NONE);
		tagTableColumn.setWidth(200);
		tagTableColumn.setText("TAG");
		table.setHeaderVisible(true);
		table.setLinesVisible(true);
		this.parent = parent;
		this.tableViewer = tableViewer;
	}

	/**
	 * Passing the focus request to the viewer's control.
	 */
	public void setFocus() {
		// viewer.getControl().setFocus();
	}

	public void showResult(String data, String workspace, String file_path) {

		String[] result = data.split("\n");
		List<String> list = new ArrayList<String>();
		for (int i = 0; i < result.length; i++) {
			list.add(result[i]);
		}
		Table table = tableViewer.getTable();
		table.clearAll();
		table.addMouseListener(new MouseListener() {

			@Override
			public void mouseUp(MouseEvent arg0) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseDown(MouseEvent arg0) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mouseDoubleClick(MouseEvent event) {
				int rowIndex = table.getSelectionIndex();
			    String text = table.getItem(rowIndex).getText(0);			     
				try {
					IWorkbenchPage page = PlatformUI.getWorkbench().getActiveWorkbenchWindow().getActivePage();
					String [] paths = file_path.split("/");
					String project =  paths[1];
					String file_path = "/"+ text.substring(project.length(), text.length());
					IWorkbenchPage wbPage = PlatformUI.getWorkbench().getActiveWorkbenchWindow().getActivePage(); 
					IFile file = ResourcesPlugin.getWorkspace().getRoot().getProject(project).getFile(file_path);
					if (file.exists()) {
						IDE.openEditor(wbPage, file, "org.eclipse.jdt.ui.CompilationUnitEditor");
					}
				} catch (CoreException e) {
					e.printStackTrace();
				}

			}
		});
		
		tableViewer.setInput(list);
	}
}
