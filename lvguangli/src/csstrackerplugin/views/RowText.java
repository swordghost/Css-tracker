package csstrackerplugin.views;

import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.part.*;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.jface.viewers.TableLayout;
import org.eclipse.jface.viewers.TableViewer;
import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.ScrolledComposite;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.events.MouseListener;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableColumn;
import org.eclipse.ui.ide.IDE;

public class RowText extends ViewPart {

	/**
	 * The ID of the view as specified by the extension.
	 */
	public static final String ID = "csstrackerplugin.views.RowText";

	private TableViewer tableViewer;

	/**
	 * The constructor.
	 */
	public RowText() {
		new ArrayList<Label>();
	}

	@Override
	public void createPartControl(Composite parent) {
		ScrolledComposite tableComposite = new ScrolledComposite(parent, SWT.V_SCROLL | SWT.H_SCROLL);
		tableComposite.setLayoutData(new GridData(SWT.LEFT, SWT.TOP, false, false, 1, 1));
//		composite.setLayout(new FillLayout());
		TableViewer tableViewer = new TableViewer(tableComposite, SWT.BORDER);
		Table table = tableViewer.getTable();
		tableComposite.setContent(table);
		tableComposite.setExpandHorizontal(true);
		tableComposite.setExpandVertical(true);
		tableComposite.setAlwaysShowScrollBars(true);
		tableComposite.setMinSize(table.computeSize(SWT.DEFAULT, SWT.DEFAULT));
		tableViewer.setContentProvider(new TableContentProvider());
		tableViewer.setLabelProvider(new TableLabelProvider());
//		table.setBounds(0, 0, 500, 500);
		tableViewer.getTable().setSize(table.computeSize(SWT.DEFAULT, tableViewer.getTable().getItemHeight()));
//		int width =tableViewer.getTable().getClientArea().width;
//		System.out.println("width:"+width);
		TableColumn pathTableColumn = new TableColumn(table, SWT.NONE);
//		pathTableColumn.setWidth(300); 
		pathTableColumn.setText("TAG                                            ");
		TableColumn tagTableColumn = new TableColumn(table, SWT.NONE);
//		tagTableColumn.setWidth(200);
		tagTableColumn.setText("file path                                                                                      ");
		table.setHeaderVisible(true);
		table.setLinesVisible(true);
		TableLayout layout = new TableLayout(); // 专用于表格的布局
		table.setLayout(layout);
		this.tableViewer = tableViewer;
		for (int i = 0, n = table.getColumnCount(); i < n; i++)
            table.getColumn(i).pack();
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
				String text = table.getItem(rowIndex).getText(1);
				try {
					PlatformUI.getWorkbench().getActiveWorkbenchWindow().getActivePage();
					String[] paths = file_path.split("/");
					String project = paths[1];
					String file_path = "/" + text.substring(project.length(), text.length());
					IWorkbenchPage wbPage = PlatformUI.getWorkbench().getActiveWorkbenchWindow().getActivePage();
					IFile file = ResourcesPlugin.getWorkspace().getRoot().getProject(project).getFile(file_path);
					if (file.exists()) {
						IDE.openEditor(wbPage, file);
					}
				} catch (CoreException e) {
					e.printStackTrace();
				}

			}
		});

		tableViewer.setInput(list);
		for (int i = 0, n = table.getColumnCount(); i < n; i++)
            table.getColumn(i).pack();
	}

	public void clearResult() {
		Table table = tableViewer.getTable();
		table.clearAll();
	}
}
