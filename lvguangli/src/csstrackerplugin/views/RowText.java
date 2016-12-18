package csstrackerplugin.views;


import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.ui.part.*;

import com.sun.scenario.effect.impl.state.PerspectiveTransformState;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.viewers.TableViewer;
import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableColumn;


public class RowText extends ViewPart {

	/**
	 * The ID of the view as specified by the extension.
	 */
	public static final String ID = "csstrackerplugin.views.RowText";

//	private TableViewer viewer;
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
	     TableColumn newColumnTableColumn = new TableColumn(table, SWT.NONE);
	     newColumnTableColumn.setWidth(400);
	     newColumnTableColumn.setText("file path");
	     TableColumn newColumnTableColumn1 = new TableColumn(table, SWT.NONE);
	     newColumnTableColumn1.setWidth(100);
	     newColumnTableColumn1.setText("TAG");
	     table.setHeaderVisible(true);              
	     table.setLinesVisible(true); 
	     this.parent = parent;
	     this.tableViewer = tableViewer;
	 }
	
	/**
	 * Passing the focus request to the viewer's control.
	 */
	public void setFocus() {
//		viewer.getControl().setFocus();
	}
	public void showResult(String data, Shell shell) {
		
		String[] result = data.split("\n");
		List<String> list = new ArrayList<String>();
		for (int i = 0; i< result.length; i++) {
			list.add(result[i]);
		}
		Table table = tableViewer.getTable();                
		table.clearAll();                  
		tableViewer.setInput(list);
	}
}
