package csstrackerplugin.views;


import org.eclipse.jface.viewers.ILabelProviderListener;
import org.eclipse.jface.viewers.ITableLabelProvider;  
import org.eclipse.jface.viewers.LabelProvider;  
import org.eclipse.swt.graphics.Image; 
  
public class TableLabelProvider extends LabelProvider implements ITableLabelProvider {  
        public String getColumnText(Object element, int columnIndex) { 
        	if (columnIndex == 0) {
        		return element.toString().split(",")[0];
        	} else {
				return element.toString().split(",")[1];
			}
        }
        public Image getColumnImage(Object element, int columnIndex) {  
            return null;  
        }
		@Override
		public void addListener(ILabelProviderListener arg0) {
			// TODO Auto-generated method stub
			
		}
		@Override
		public void dispose() {
			// TODO Auto-generated method stub
			
		}
		@Override
		public boolean isLabelProperty(Object arg0, String arg1) {
			// TODO Auto-generated method stub
			return false;
		}
		@Override
		public void removeListener(ILabelProviderListener arg0) {
			// TODO Auto-generated method stub
			
		}  
    }